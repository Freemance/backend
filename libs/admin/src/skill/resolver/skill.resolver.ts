import { ParseIntPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateSkillInput, Skill, SkillService, UpdateSkillInput } from '..'

@Resolver()
export class SkillResolver {
  constructor(private readonly service: SkillService) {}

  @Query(() => [Skill], { nullable: true })
  getAllSkill() {
    return this.service.getAllSkill()
  }

  @Query(() => Skill, { nullable: true })
  getSkillById(@Args('id', ParseIntPipe) id: number) {
    return this.service.getSkillById(id)
  }

  @Mutation(() => Skill, { nullable: true })
  createSkill(@Args('input') input: CreateSkillInput) {
    return this.service.createSkill(input)
  }

  @Mutation(() => Skill, { nullable: true })
  updateSkill(@Args('id', ParseIntPipe) id: number, @Args('input') input: UpdateSkillInput) {
    return this.service.updateSkill(id, input)
  }
}
