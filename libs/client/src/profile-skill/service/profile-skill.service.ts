import { DataService } from '@feature/core'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProfileSkillInput, UpdateProfileSkillInput } from '..'

@Injectable()
export class ProfileSkillService {
  constructor(private readonly data: DataService) {}

  private readonly includes = {}

  create(input: CreateProfileSkillInput) {
    return this.data.profileSkill.create({
      data: {
        ...input,
      },
    })
  }

  findAll() {
    return this.data.profileSkill.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async findOne(id: number) {
    const found = await this.data.language.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Language with id: ${id} not found`)
    }
    return found
  }

  async update(id: number, input: UpdateProfileSkillInput) {
    const found = await this.findOne(id)
    return this.data.language.update({ where: { id: found.id }, data: { ...input } })
  }

  async remove(id: number) {
    const found = await this.findOne(id)
    const deleted = this.data.profileSkill.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
