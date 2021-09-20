import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { TagService } from '../service/tag.service'
import { Tag } from '../entities/tag.entity'
import { CreateTagInput } from '../dto/create-tag.input'
import { UpdateTagInput } from '../dto/update-tag.input'
import { TagOrder } from '../dto/tag-order.input'
import { PaginationArgs } from '@feature/core'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard, Role, Roles, RolesGuard } from '@feature/auth'
import { TagConnection } from '../entities/tag-connection.model'

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly _service: TagService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Tag, { nullable: true })
  createTag(@Args('input') createTagInput: CreateTagInput) {
    return this._service.createTag(createTagInput)
  }

  @Query(() => TagConnection)
  async filterTags(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => TagOrder,
      nullable: true,
    })
    orderBy: TagOrder,
  ) {
    return this._service.filter(after, before, first, last, query, orderBy)
  }

  @Query(() => Tag, { name: 'tag', nullable: true })
  getTagById(@Args('id', { type: () => Int }) id: number) {
    return this._service.getTagById(id)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Tag, { nullable: true })
  updateTag(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateTagInput) {
    return this._service.updateTag(id, input)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Boolean, { nullable: true })
  deleteTag(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteTag(id)
  }
}
