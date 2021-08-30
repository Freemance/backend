import { Injectable, NotFoundException } from '@nestjs/common'
import { DataService } from '@feature/core'

import { CreateSkillInput } from '../dto/create-skill.input'
import { UpdateSkillInput } from '../dto/update-skill.input'

@Injectable()
export class SkillService {
  constructor(private readonly _service: DataService) {}
  private readonly includes = { profiles: true }

  public async getAllSkill() {
    return this._service.skill.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  public async getSkillById(id: number) {
    const found = await this._service.skill.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Skill with id: ${id} not found`)
    }
    return found
  }

  public createSkill(input: CreateSkillInput) {
    return this._service.skill.create({
      data: {
        ...input,
      },
    })
  }

  public async updateSkill(id: number, input: UpdateSkillInput) {
    const found = await this.getSkillById(id)

    return this._service.skill.update({ where: { id: found.id }, data: { ...input } })
  }

  public async deleteSkill(id: number) {
    const found = await this.getSkillById(id)
    const deleted = this._service.skill.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
