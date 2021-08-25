import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateSkillInput, Skill, SkillService } from '..'

@Resolver()
export class SkillResolver {
  constructor(private readonly service: SkillService) {}

  @Query(() => [Skill], { nullable: true })
  getAllSkill() {
    return this.service.getAllSkill()
  }

  @Query(() => Skill, { nullable: true })
  getSkillById(@Args('id') id: number) {
    return this.service.getSkillById(id)
  }

  @Mutation(() => Skill, { nullable: true })
  createSkill(@Args('input') input: CreateSkillInput) {
    return this.service.createSkill(input)
  }
}
