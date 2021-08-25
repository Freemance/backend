import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CreateSociallinkInput, SocialLink, SocialLinksService, UpdateSociallinkInput } from '..'

@Resolver(() => SocialLink)
export class SocialLinksResolver {
  constructor(private readonly sociallinksService: SocialLinksService) {}

  @Mutation(() => SocialLink)
  createSociallink(@Args('createSociallinkInput') createSociallinkInput: CreateSociallinkInput) {
    return this.sociallinksService.create(createSociallinkInput)
  }

  @Query(() => [SocialLink], { name: 'sociallinks' })
  findAll() {
    return this.sociallinksService.findAll()
  }

  @Query(() => SocialLink, { name: 'SocialLink' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sociallinksService.findOne(id)
  }

  @Mutation(() => SocialLink)
  updateSociallink(@Args('updateSociallinkInput') updateSociallinkInput: UpdateSociallinkInput) {
    return this.sociallinksService.update(updateSociallinkInput.id, updateSociallinkInput)
  }

  @Mutation(() => SocialLink)
  removeSociallink(@Args('id', { type: () => Int }) id: number) {
    return this.sociallinksService.remove(id)
  }
}
