import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagService } from '../service/tag.service';
import { Tag } from '../entities/tag.entity';
import { CreateTagInput } from '../dto/create-tag.input';
import { UpdateTagInput } from '../dto/update-tag.input';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Query(() => [Tag], { name: 'tag' })
  getAllTag() {
    return this.tagService.getAllTag();
  }

  @Query(() => Tag, { name: 'tag' })
  getTagById(@Args('id', ParseIntPipe) id: number): String {
    return this.tagService.getTagById(id);
  }

  @Mutation(() => Tag)
  updateTag(@Args('id', ParseIntPipe) id: number, @Args('input') input: UpdateTagInput) {
    return this.tagService.update(id, input);
  }

  @Mutation(() => Tag)
  deleteTag(@Args('id', ParseIntPipe) id: number) {
    return this.tagService.delete(id);
  }
}
