import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateProfileInput } from '../dto/create-profile.input'
import { UpdateProfileInput } from '../dto/update-profile.input'
import { Profile } from '../entities/profile.entity'
import { ProfileService } from '../service/profile.service'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly _service: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(@Args('createProfileInput') createProfileInput: CreateProfileInput) {
    return this._service.create(createProfileInput)
  }

  @Query(() => [Profile], { name: 'profile' })
  findAll() {
    return this._service.findAll()
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this._service.findOne(id)
  }

  @Mutation(() => Profile)
  updateProfile(@Args('updateProfileInput') updateProfileInput: UpdateProfileInput) {
    return this._service.update(updateProfileInput.id, updateProfileInput)
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this._service.remove(id)
  }
}
