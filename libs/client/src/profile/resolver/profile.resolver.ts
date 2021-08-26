import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CreateProfileInput, Profile, ProfileService, UpdateProfileInput } from '..'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(@Args('createProfileInput') createProfileInput: CreateProfileInput) {
    return this.profileService.create(createProfileInput)
  }

  @Query(() => [Profile], { name: 'profile' })
  findAll() {
    return this.profileService.findAll()
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id)
  }

  @Mutation(() => Profile)
  updateProfile(@Args('updateProfileInput') updateProfileInput: UpdateProfileInput) {
    return this.profileService.update(updateProfileInput.id, updateProfileInput)
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id)
  }
}
