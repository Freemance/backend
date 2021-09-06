import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { SocialLink } from '../entities/socialLinks.entity'
import { SocialLinksService } from '../service/socialLinks.service'
import { UpdateSocialLinkInput } from '../dto/update-socialLinks.input'

@UseGuards(GqlAuthGuard, RolesGuard)
@Roles(Role.USER)
@Resolver(() => SocialLink)
export class SocialLinksResolver {
  constructor(private readonly _service: SocialLinksService) {}

  @Query(() => SocialLink, { name: 'ProfileSLink', nullable: true })
  getProfileSLinkById(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.getProfileSLinkById(id, user.profile.id)
  }

  @Mutation(() => SocialLink, { name: 'ProfileUpdateSLinks', nullable: true })
  updateProfileSLink(
    @UserEntity() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateSocialLinkInput,
  ) {
    return this._service.updateProfileSLink(id, user.profile.id, input)
  }
}
