import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CreateTagInput, Tag, TagService, UpdateTagInput } from '..'

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly service: TagService) {}

  @Mutation(() => Tag, { nullable: true })
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.service.createTag(createTagInput)
  }

  @Query(() => [Tag], { name: 'tags', nullable: 'items' })
  getAllTag() {
    return this.service.getAllTag()
  }

  @Query(() => Tag, { name: 'tag', nullable: true })
  getTagById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getTagById(id)
  }

  @Mutation(() => Tag, { nullable: true })
  updateTag(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateTagInput) {
    return this.service.updateTag(id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  deleteTag(@Args('id', { type: () => Int }) id: number) {
    return this.service.deleteTag(id)
  }
}
