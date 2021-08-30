import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSkillInput, Skill, SkillService, UpdateSkillInput } from '..'

@Resolver()
export class SkillResolver {
  constructor(private readonly service: SkillService) {}

  @Query(() => [Skill], { name: 'skills', nullable: 'items' })
  getAllSkill() {
    return this.service.getAllSkill()
  }

  @Query(() => Skill, { name: 'skill', nullable: true })
  getSkillById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getSkillById(id)
  }

  @Mutation(() => Skill, { nullable: true })
  createSkill(@Args('input') input: CreateSkillInput) {
    return this.service.createSkill(input)
  }

  @Mutation(() => Skill, { nullable: true })
  updateSkill(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateSkillInput) {
    return this.service.updateSkill(id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  deleteSkill(@Args('id', { type: () => Int }) id: number) {
    return this.service.deleteSkill(id)
  }
}
