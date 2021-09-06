import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { PaginationArgs } from '@feature/core'
import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { ProfileOrder } from '../dto/profile-order.input'
import { Profile } from '../entities/profile.entity'
import { ProfileConnection } from '../entities/profile-connection.model'
import { ProfileService } from '../service/profile.service'
import { UpdateBasicProfileInput } from '../dto/update-basicProfile.input'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly _service: ProfileService) {}

  @Query(() => ProfileConnection, { name: 'ProfileFilter', nullable: true })
  async filter(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => ProfileOrder,
      nullable: true,
    })
    orderBy: ProfileOrder,
  ) {
    return this._service.filter(after, before, first, last, query, orderBy)
  }

  @Query(() => Profile, { name: 'GetProfileById', nullable: true })
  async getProfileById(@Args('id', { type: () => Int }) id: number) {
    return this._service.getProfileById(id)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Profile, { name: 'UpdateBasicProfileInfo', nullable: true })
  async updateBasicProfileInfo(
    @UserEntity() user: User,
    @Args('input') input: UpdateBasicProfileInput,
    @Args('avatar') avatar?: string,
  ) {
    return this._service.updateBasicProfileInfo(user.profile.id, input, avatar)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Profile, { name: 'UpdateProfileSkills', nullable: true })
  async updateProfileSkills(
    @UserEntity() user: User,
    @Args('skillsId', { type: () => [{ id: Int }] }) skillsId: [{ id: number }],
  ) {
    return this._service.updateProfileSkills(user.profile.id, skillsId)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Profile, { name: 'UpdateProfileTag', nullable: true })
  async updateProfileTag(@UserEntity() user: User, @Args('tagId', { type: () => Int }) tagId: number) {
    return this._service.updateProfileTag(user.profile.id, tagId)
  }
}
