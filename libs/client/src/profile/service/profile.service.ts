import { Injectable, NotFoundException } from '@nestjs/common'
import { DataService, findManyCursorConnection } from '@feature/core'
import { UpdateBasicProfileInput } from '../dto/update-basicProfile.input'
import { MultimediaService } from '@feature/client/multimedia'

@Injectable()
export class ProfileService {
  constructor(private readonly _service: DataService, private readonly _multimediaService: MultimediaService) {}

  private includes = {
    tag: true,
    skills: true,
    socialLinks: true,
    employmentHistory: true,
    courses: true,
    portfolioItem: true,
    languages: true,
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

    if (tag) {
      conditions.AND.push({ tagId: { equals: tag } })
    }

    const a = await findManyCursorConnection(
      (args) =>
        this._service.profile.findMany({
          include: { skills: true },
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

  async updateProfileBasicInfo(profileId: number, input: UpdateBasicProfileInput) {
    const found = await this.getProfileById(profileId)
    let newAvatar = found.avatar
    if (input.avatar !== null) {
      let PromiseAvatar = await this._multimediaService.saveMultimedia(profileId, input.avatar)

      console.log(newAvatar)
      console.log(PromiseAvatar)
    }

    //   if (found.avatar !== null) {
    //     console.log(found.avatar)
    //     await this._multimediaService.deleteMultimediaByUser(profileId, found.avatar)
    //   }
    // }

    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        ...input,
        avatar: newAvatar,
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
    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        tag: {
          connect: { id: foundTag.id },
        },
      },
    })
  }
}
