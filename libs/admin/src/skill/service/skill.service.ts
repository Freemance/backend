import { DataService } from '@feature/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SkillService {
  constructor(private readonly data: DataService) {}
  // future includes
  private readonly includes = {}

  public async getAllSkill() {
    return this.data.skill.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }
}
