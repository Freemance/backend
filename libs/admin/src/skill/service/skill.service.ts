import { DataService } from '@feature/core'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSkillInput } from '..'

@Injectable()
export class SkillService {
  constructor(private readonly data: DataService) {}
  // future includes
  private readonly includes = {}

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
}
