import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { PaginationArgs } from '@feature/core'
import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { ProfileOrder } from '../dto/profile-order.input'
import { Profile } from '../entities/profile.entity'
import { ProfileConnection } from '../entities/profile-connection.model'
import { ProfileService } from '../service/profile.service'
import { UpdateBasicProfileInput } from '../dto/update-basicProfile.input'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly _service: ProfileService) {}

  @Query(() => ProfileConnection, { name: 'profileFilter', nullable: true })
  async filter(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({ name: 'skills', type: () => [Int], nullable: true })
    skills: [number],
    @Args({ name: 'tag', type: () => Int, nullable: true })
    tag: number,
    @Args({
      name: 'orderBy',
      type: () => ProfileOrder,
      nullable: true,
    })
    orderBy: ProfileOrder,
  ) {
    return this._service.filter(after, before, first, last, query, orderBy, skills, tag)
  }

  @Query(() => Profile, { name: 'profileById', nullable: true })
  async getProfileById(@Args('id', { type: () => Int }) id: number) {
    return this._service.getProfileById(id)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Profile, { name: 'profileUpdateBasicInfo', nullable: true })
  async updateProfileBasicInfo(@UserEntity() user: User, @Args('input') input: UpdateBasicProfileInput) {
    return this._service.updateProfileBasicInfo(user.profile.id, input)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Profile, { name: 'profileAddSkill', nullable: true })
  async addProfileSkill(@UserEntity() user: User, @Args('skillId', { type: () => Int }) skillId: number) {
    return this._service.addProfileSkill(user.profile.id, skillId)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Profile, { name: 'profileRemoveSkill', nullable: true })
  async removeProfileSkill(@UserEntity() user: User, @Args('skillId', { type: () => Int }) skillId: number) {
    return this._service.removeProfileSkill(user.profile.id, skillId)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Profile, { name: 'profileUpdateTag', nullable: true })
  async updateProfileTag(@UserEntity() user: User, @Args('tagId', { type: () => Int }) tagId: number) {
    return this._service.updateProfileTag(user.profile.id, tagId)
  }
}
