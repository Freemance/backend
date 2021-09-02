import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { DataService } from '@feature/core'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'

@Injectable()
export class MultimediaService {
  constructor(private readonly _service: DataService) {}

  async getAllMultimedias() {
    return this._service.course.findMany({ orderBy: { id: 'asc' } })
  }

  async createMultimedia(profileId: number, input: CreateMultimediaInput) {
    return this._service.multimedia.create({
      data: {
        created_by: profileId,
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

  async removeMultimediaByUser(id: number, profileId: number) {
    const found = await this.getMultimediaById(id)
    if (found.created_by !== profileId) {
      throw new UnauthorizedException()
    }
    const deleted = await this._service.multimedia.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }

  async removeMultimediaByAdmin(id: number) {
    const found = await this.getMultimediaById(id)
    const deleted = await this._service.multimedia.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
