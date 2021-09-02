import { Injectable, NotFoundException } from '@nestjs/common'

import { DataService, findManyCursorConnection } from '@feature/core'
import { CreateTagInput } from '../dto/create-tag.input'
import { UpdateTagInput } from '../dto/update-tag.input'

@Injectable()
export class TagService {
  constructor(private readonly _service: DataService) {}
  private readonly includes = { profiles: true }

  public createTag(input: CreateTagInput) {
    return this._service.tag.create({
      data: {
        ...input,
      },
    })
  }

  async filter(after, before, first, last, query, orderBy) {
    const a = await findManyCursorConnection(
      (args) =>
        this._service.tag.findMany({
          where: {
            name: { contains: query || '', mode: 'insensitive' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this._service.tag.count({
          where: {
            name: { contains: query || '', mode: 'insensitive' },
          },
        }),
      { first, last, before, after },
    )
    return a
  }

  public async getAllTag() {
    return this._service.tag.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  public async getTagById(id: number) {
    const found = await this._service.tag.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Tag with id: ${id} not found`)
    }
    return found
  }

  public async updateTag(id: number, input: UpdateTagInput) {
    const found = await this.getTagById(id)

    return this._service.tag.update({ where: { id: found.id }, data: { ...input } })
  }

  public async deleteTag(id: number) {
    const found = await this.getTagById(id)
    const deleted = await this._service.tag.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
