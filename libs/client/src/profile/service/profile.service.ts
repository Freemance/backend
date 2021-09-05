import { Injectable } from '@nestjs/common'
import { DataService, findManyCursorConnection } from '@feature/core'
import { CreateProfileInput } from '../dto/create-profile.input'
import { UpdateProfileInput } from '../dto/update-profile.input'

@Injectable()
export class ProfileService {
  constructor(private readonly _service: DataService) {}
  private includes = { tag: true, skills: true }

  async filter(after: number, before: number, first: number, last: number, query: string, orderBy) {
    const a = await findManyCursorConnection(
      (args) =>
        this._service.profile.findMany({
          where: {
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
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this._service.profile.count({
          where: {
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
          },
        }),
      { first, last, before, after },
    )
    return a
  }

  async getProfiles() {
    return await this._service.profile.findMany()
  }
}
