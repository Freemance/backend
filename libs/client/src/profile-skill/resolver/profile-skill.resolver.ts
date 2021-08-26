import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CreateProfileSkillInput, ProfileSkill, ProfileSkillService, UpdateProfileSkillInput } from '..'

@Resolver(() => ProfileSkill)
export class ProfileSkillResolver {
  constructor(private readonly profileSkillService: ProfileSkillService) {}

  @Mutation(() => ProfileSkill)
  createProfileSkill(@Args('input') input: CreateProfileSkillInput) {
    return this.profileSkillService.create(input)
  }

  @Query(() => [ProfileSkill], { name: 'profileSkill' })
  findAll() {
    return this.profileSkillService.findAll()
  }

  @Query(() => ProfileSkill, { name: 'profileSkill' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileSkillService.findOne(id)
  }

  @Mutation(() => ProfileSkill)
  updateProfileSkill(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateProfileSkillInput) {
    return this.profileSkillService.update(id, input)
  }

  @Mutation(() => ProfileSkill)
  removeProfileSkill(@Args('id', { type: () => Int }) id: number) {
    return this.profileSkillService.remove(id)
  }
}
