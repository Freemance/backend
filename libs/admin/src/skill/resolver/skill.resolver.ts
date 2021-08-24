import { Query, Resolver } from '@nestjs/graphql'

import { SkillService } from '../service/skill.service'
import { Skill } from '../model/skill'
@Resolver()
export class SkillResolver {
  constructor(private readonly service: SkillService) {}

  @Query(() => [Skill], { nullable: true })
  getAllSkill() {
    return this.service.getAllSkill()
  }
}
