import { Injectable, NotFoundException } from '@nestjs/common'
import { DataService, findManyCursorConnection } from '@feature/core'
import { UpdateBasicProfileInput } from '../dto/update-basicProfile.input'

@Injectable()
export class ProfileService {
  constructor(private readonly _service: DataService) {}
  private includes = {
    tag: true,
    skills: true,
    socialLinks: true,
    employmentHistory: true,
    courses: true,
    portfolioItem: true,
    languages: true,
  }

  async filter(after: number, before: number, first: number, last: number, query: string, orderBy) {
    const a = await findManyCursorConnection(
      (args) =>
        this._service.profile.findMany({
          where: {
            OR: [
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
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this._service.profile.count({
          where: {
            OR: [
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
          },
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

  async updateBasicProfileInfo(profileId: number, input: UpdateBasicProfileInput, avatar?: string) {
    const found = await this.getProfileById(profileId)
    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        ...input,
        avatar: avatar ? avatar : found.avatar,
      },
    })
  }

  async updateProfileSkills(profileId: number, skillsId: [{ id: number }]) {
    const found = await this.getProfileById(profileId)
    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        skills: {
          connect: skillsId,
        },
      },
    })
  }
  async updateProfileTag(profileId: number, tagId: number) {
    const found = await this.getProfileById(profileId)
    return this._service.profile.update({
      include: this.includes,
      where: { id: found.id },
      data: {
        tag: {
          connect: { id: tagId },
        },
      },
    })
  }
}
