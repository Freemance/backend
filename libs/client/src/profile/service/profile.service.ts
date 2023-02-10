import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Prisma } from '.prisma/client'
import { DataService, findManyCursorConnection } from '@feature/core'
import { UpdateBasicProfileInput } from '../dto/update-basicProfile.input'
import { MultimediaService } from '@feature/client/multimedia'
import { FileUpload } from 'graphql-upload'
import { ProfileStatus } from '@feature/client/profile'
import { EmailService } from '@feature/auth'
import { verifySlykUrl } from 'libs/utils/verifySlykUrl'

@Injectable()
export class ProfileService {
  constructor(
    private readonly _service: DataService,
    private readonly _multimediaService: MultimediaService,
    private readonly _emailService: EmailService,
  ) {}

  private includes: Prisma.ProfileInclude = {
    tag: true,
    skills: true,
    socialLinks: true,
    employmentHistory: { orderBy: { startDate: 'desc' } },
    courses: { orderBy: { startDate: 'desc' } },
    portfolioItem: { orderBy: { startDate: 'desc' } },
    languages: true,
    user: true,
  }

  async filter(
    after: number,
    before: number,
    first: number,
    last: number,
    query: string,
    orderBy,
    skills: [number],
    tag: number,
    profileStatus?: string,
  ) {
    const conditions: any = {
      OR: [
        {
          firstName: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          slykUser: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          jobTitle: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          bio: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          country: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          city: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          address: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          postalCode: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          placeOfBirth: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
        {
          phone: {
            contains: query || '',
            mode: 'insensitive',
          },
        },
      ],
      AND: [
        {
          skills: {
            every: {
              id: { in: skills },
            },
          },
        },
      ],
    }
    if (profileStatus) {
      conditions.AND.push({
        profileStatus: {
          equals: profileStatus,
        },
      })
    }
    if (tag) {
      conditions.AND.push({ tagId: { equals: tag } })
    }

    const a = await findManyCursorConnection(
      (args) =>
        this._service.profile.findMany({
          include: { skills: true, tag: true, user: true },
          where: conditions,
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this._service.profile.count({
          where: conditions,
        }),
      { first, last, before, after },
    )
    return a
  }

  async getProfileById(profileId: number) {
    const found = await this._service.profile.findUnique({
      include: this.includes,
      where: { id: profileId },
    })
    if (!found) {
      throw new NotFoundException(`Profile with id: ${profileId} not found`)
    }
    return found
  }

  async getProfileByUsername(username: string) {
    const found = await this._service.profile.findFirst({
      include: this.includes,
      where: {
        user: {
          username: {
            equals: username,
          },
        },
      },
    })
    if (!found) {
      throw new NotFoundException(`Profile with username: ${username} not found`)
    }
    if (found.profileStatus != ProfileStatus.APPROVED) {
      throw new UnauthorizedException(`Profile with username: ${username} not found`)
    }
    return found
  }

  async updateProfileBasicInfo(profileId: number, input: UpdateBasicProfileInput, tag?: number, file?: FileUpload) {
    const found = await this.getProfileById(profileId)
    let newAvatar: string = found.avatar
    if (input.slykUser && found.profileStatus === ProfileStatus.APPROVED) {
      throw new UnauthorizedException(`Profile with id: ${profileId} is already approved so it can't update slykUser`)
    }
    if (input.slykUser) {
      const slykExists = await verifySlykUrl(input.slykUser)

      if (!slykExists) {
        throw new ConflictException('Slyk user does not exist')
      }
    }

    if (file) {
      const { filename } = await this._multimediaService.saveMultimedia(profileId, file)
      newAvatar = filename
      if (found.avatar !== null) {
        try {
          await this._multimediaService.deleteMultimediaByUser(profileId, found.avatar)
        } catch (e) {
          console.log(e)
        }
      }
    }
    if (tag) {
      await this.updateProfileTag(profileId, tag)
    }
    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        ...input,
        avatar: newAvatar,
      },
    })
  }

  async updateProfileStatus(profileId: number, status: ProfileStatus) {
    const found = await this.getProfileById(profileId)
    const user = await this._service.user.findUnique({ where: { id: found.userId } })
    if (status === ProfileStatus.APPROVED) {
      this._emailService.approvedProfile(user)
    } else if (status !== ProfileStatus.DISAPPROVED) {
      this._emailService.updateProfile(user)
    }
    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        profileStatus: status,
      },
    })
  }

  async addProfileSkill(profileId: number, skillId: number) {
    const found = await this.getProfileById(profileId)
    const foundSkill = await this._service.skill.findUnique({ where: { id: skillId } })
    if (!foundSkill) {
      throw new NotFoundException(`Skill with id: ${skillId} not found`)
    }
    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        skills: {
          connect: { id: skillId },
        },
      },
    })
  }

  async removeProfileSkill(profileId: number, skillId: number) {
    const found = await this.getProfileById(profileId)
    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        skills: {
          disconnect: { id: skillId },
        },
      },
    })
  }

  async updateProfileTag(profileId: number, tagId: number) {
    const found = await this.getProfileById(profileId)

    const foundTag = await this._service.tag.findUnique({ where: { id: tagId } })
    if (!foundTag) {
      throw new NotFoundException(`Tag with id: ${tagId} not found`)
    }
    await this._service.profile.update({
      where: { id: found.id },
      data: {
        tag: {
          connect: { id: foundTag.id },
        },
      },
    })
  }

  async removeProfileAvatar(profileId: number, filename: string) {
    const found = await this.getProfileById(profileId)
    if (found.avatar === filename) {
      try {
        const { filename: foundFilename, extension } = await this._multimediaService.getMultimediaByFilename(filename)
        await this._multimediaService.deleteFilesInServer(foundFilename, extension)
      } catch (e) {
        console.log(e)
      }
      return this._service.profile.update({ where: { id: profileId }, data: { avatar: '' } })
    } else {
      throw new NotFoundException(`profile: ${profileId} not has avatar with filename:${filename}`)
    }
  }
}
