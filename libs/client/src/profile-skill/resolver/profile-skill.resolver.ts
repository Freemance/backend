import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateProfileSkillInput } from '../dto/create-profile-skill.input'
import { UpdateProfileSkillInput } from '../dto/update-profile-skill.input'
import { ProfileSkill } from '../entities/profile-skill.entity'
import { ProfileSkillService } from '../service/profile-skill.service'

@Resolver(() => ProfileSkill)
export class ProfileSkillResolver {
  constructor(private readonly _service: ProfileSkillService) {}

  @Mutation(() => ProfileSkill, { nullable: true })
  createProfileSkill(
    @Args('input') input: CreateProfileSkillInput,
    @Args('profileId', { type: () => Int }) profileId: number,
    @Args('skillId', { type: () => Int }) skillId: number,
  ) {
    return this._service.createProfileSkill(input, profileId, skillId)
  }

  @Query(() => [ProfileSkill], { name: 'profileSkills', nullable: 'items' })
  getAllProfileSkill() {
    return this._service.getAllProfileSkill()
  }

  @Query(() => ProfileSkill, { name: 'profileSkill', nullable: true })
  getProfileSkillById(@Args('id', { type: () => Int }) id: number) {
    return this._service.getProfileSkillById(id)
  }

  @Mutation(() => ProfileSkill, { nullable: true })
  updateProfileSkill(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateProfileSkillInput,
    @Args('profileId', { type: () => Int }) profileId: number,
    @Args('skillId', { type: () => Int }) skillId: number,
  ) {
    return this._service.updateProfileSkill(id, input, profileId, skillId)
  }

  @Mutation(() => Boolean, { nullable: true })
  deleteProfileSkill(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteProfileSkill(id)
  }
}
