import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTagInput, UpdateTagInput } from '..'
import { DataService } from '@feature/core'

@Injectable()
export class TagService {
  constructor(private readonly data: DataService) {}
  private readonly includes = { profiles: true }

  public createTag(input: CreateTagInput) {
    return this.data.tag.create({
      data: {
        ...input,
      },
    })
  }

  public async getAllTag() {
    return this.data.tag.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  public async getTagById(id: number) {
    const found = await this.data.tag.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Tag with id: ${id} not found`)
    }
    return found
  }

  public async updateTag(id: number, input: UpdateTagInput) {
    const found = await this.getTagById(id)

    return this.data.tag.update({ where: { id: found.id }, data: { ...input } })
  }

  public async deleteTag(id: number) {
    const found = await this.getTagById(id)
    const deleted = this.data.tag.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
