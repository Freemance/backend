import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { TagService } from '../service/tag.service'
import { Tag } from '../entities/tag.entity'
import { CreateTagInput } from '../dto/create-tag.input'
import { UpdateTagInput } from '../dto/update-tag.input'

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly _service: TagService) {}

  @Mutation(() => Tag, { nullable: true })
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this._service.createTag(createTagInput)
  }

  @Query(() => [Tag], { name: 'tags', nullable: 'items' })
  getAllTag() {
    return this._service.getAllTag()
  }

  @Query(() => Tag, { name: 'tag', nullable: true })
  getTagById(@Args('id', { type: () => Int }) id: number) {
    return this._service.getTagById(id)
  }

  @Mutation(() => Tag, { nullable: true })
  updateTag(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateTagInput) {
    return this._service.updateTag(id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  deleteTag(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteTag(id)
  }
}
