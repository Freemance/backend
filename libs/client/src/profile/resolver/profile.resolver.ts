import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { PaginationArgs } from '@feature/core'
import { GqlAuthGuard } from '@feature/auth'
import { ProfileOrder } from '../dto/profile-order.input'
import { Profile } from '../entities/profile.entity'
import { ProfileConnection } from '../entities/profile-connection.model'
import { CreateProfileInput } from '../dto/create-profile.input'
import { UpdateProfileInput } from '../dto/update-profile.input'
import { ProfileService } from '../service/profile.service'

@UseGuards(GqlAuthGuard)
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

  @Query(() => [Profile], { name: 'GetAllProfilees', nullable: true })
  async getAllProfiles() {
    return this._service.getProfiles()
  }
}
