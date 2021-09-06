import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { DataService } from '@feature/core'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'

@Injectable()
export class MultimediaService {
  constructor(private readonly _service: DataService) {}

  async getAllMultimedias() {
    return this._service.multimedia.findMany({ orderBy: { id: 'asc' } })
  }

  async createMultimedia(profileId: number, input: CreateMultimediaInput) {
    return this._service.multimedia.create({
      data: {
        createdBy: profileId,
        ...input,
      },
    })
  }

  async getMultimediaById(id: number) {
    const found = await this._service.multimedia.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Multimedia with id: ${id} not found`)
    }
    return found
  }

  async deleteMultimediaByUser(id: number, profileId: number) {
    const found = await this.getMultimediaById(id)
    if (found.createdBy !== profileId) {
      throw new UnauthorizedException()
    }
    const deleted = await this._service.multimedia.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }

  async deleteMultimediaByAdmin(id: number) {
    const found = await this.getMultimediaById(id)
    const deleted = await this._service.multimedia.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
