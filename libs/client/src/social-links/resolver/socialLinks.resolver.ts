import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateSocialLinkInput } from './../dto/create-socialLinks.input'
import { SocialLink } from '../entities/socialLinks.entity'
import { SocialLinksService } from '../service/socialLinks.service'
import { UpdateSocialLinkInput } from '../dto/update-socialLinks.input'

@Resolver(() => SocialLink)
export class SocialLinksResolver {
  constructor(private readonly service: SocialLinksService) {}

  @Mutation(() => SocialLink)
  createSocialLink(@Args('input') input: CreateSocialLinkInput) {
    return this.service.createSocialLink(input)
  }

  @Query(() => [SocialLink], { name: 'socialLinks' })
  getAllSocialLink() {
    return this.service.getAllSocialLink()
  }

  @Query(() => SocialLink, { name: 'socialLink' })
  getSocialLinkById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getSocialLinkById(id)
  }

  @Mutation(() => SocialLink)
  updateSocialLink(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateSocialLinkInput) {
    return this.service.updateSocialLink(id, input)
  }

  @Mutation(() => Boolean)
  deleteSocialLink(@Args('id', { type: () => Int }) id: number) {
    return this.service.deleteSocialLink(id)
  }
}
