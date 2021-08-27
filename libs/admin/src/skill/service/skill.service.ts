import { Injectable, NotFoundException } from '@nestjs/common'
import { DataService } from '@feature/core'

import { CreateSkillInput, UpdateSkillInput } from '..'

@Injectable()
export class SkillService {
  constructor(private readonly data: DataService) {}
  // future includes
  private readonly includes = { profiles: true }

  public async getAllSkill() {
    return this.data.skill.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  public async getSkillById(id: number) {
    const found = await this.data.skill.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Skill with id: ${id} not found`)
    }
    return found
  }

  public createSkill(input: CreateSkillInput) {
    return this.data.skill.create({
      data: {
        ...input,
      },
    })
  }

  public async updateSkill(id: number, input: UpdateSkillInput) {
    const found = await this.getSkillById(id)

    return this.data.skill.update({ where: { id: found.id }, data: { ...input } })
  }

  public async deleteSkill(id: number) {
    // No se si es necesario comprobar que existe
    const found = await this.getSkillById(id)
    const deleted = this.data.skill.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
