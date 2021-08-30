import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateSocialLinkInput } from './../dto/create-socialLinks.input'
import { SocialLink } from '../entities/socialLinks.entity'
import { SocialLinksService } from '../service/socialLinks.service'
import { UpdateSocialLinkInput } from '../dto/update-socialLinks.input'

@Resolver(() => SocialLink)
export class SocialLinksResolver {
  constructor(private readonly _service: SocialLinksService) {}

  @Mutation(() => SocialLink, { nullable: true })
  createSocialLink(@Args('input') input: CreateSocialLinkInput) {
    return this._service.createSocialLink(input)
  }

  @Query(() => [SocialLink], { name: 'socialLinks', nullable: 'items' })
  getAllSocialLink() {
    return this._service.getAllSocialLink()
  }

  @Query(() => SocialLink, { name: 'socialLink', nullable: true })
  getSocialLinkById(@Args('id', { type: () => Int }) id: number) {
    return this._service.getSocialLinkById(id)
  }

  @Mutation(() => SocialLink, { nullable: true })
  updateSocialLink(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateSocialLinkInput) {
    return this._service.updateSocialLink(id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  deleteSocialLink(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteSocialLink(id)
  }
}
