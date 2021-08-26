import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateProfileSkillInput } from '../dto/create-profile-skill.input'
import { UpdateProfileSkillInput } from '../dto/update-profile-skill.input'
import { ProfileSkill } from '../entities/profile-skill.entity'
import { ProfileSkillService } from '../service/profile-skill.service'

@Resolver(() => ProfileSkill)
export class ProfileSkillResolver {
  constructor(private readonly service: ProfileSkillService) {}

  @Mutation(() => ProfileSkill)
  createProfileSkill(
    @Args('input') input: CreateProfileSkillInput,
    @Args('profileId', { type: () => Int }) profileId: number,
    @Args('skillId', { type: () => Int }) skillId: number,
  ) {
    return this.service.createProfileSkill(input, profileId, skillId)
  }

  @Query(() => [ProfileSkill], { name: 'profileSkills' })
  getAllProfileSkill() {
    return this.service.getAllProfileSkill()
  }

  @Query(() => ProfileSkill, { name: 'profileSkill' })
  getProfileSkillById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getProfileSkillById(id)
  }

  @Mutation(() => ProfileSkill)
  updateProfileSkill(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateProfileSkillInput,
    @Args('profileId', { type: () => Int }) profileId: number,
    @Args('skillId', { type: () => Int }) skillId: number,
  ) {
    return this.service.updateProfileSkill(id, input, profileId, skillId)
  }

  @Mutation(() => Boolean)
  deleteProfileSkill(@Args('id', { type: () => Int }) id: number) {
    return this.service.deleteProfileSkill(id)
  }
}
