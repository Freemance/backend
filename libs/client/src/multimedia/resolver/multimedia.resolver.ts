import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { GqlAuthGuard } from '@feature/auth'
import { MultimediaService } from './../service/multimedia.service'
import { Multimedia } from '../entities/multimedia.entity'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'

@UseGuards(GqlAuthGuard)
@Resolver(() => Multimedia)
export class MultimediaResolver {
  constructor(private readonly _service: MultimediaService) {}

  @Mutation(() => Multimedia)
  createMultimedia(@Args('input') input: CreateMultimediaInput) {
    return this._service.create(input)
  }

  @Query(() => [Multimedia], { name: 'multimedia' })
  findAll() {
    return this._service.findAll()
  }

  @Query(() => Multimedia, { name: 'multimedia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this._service.findOne(id)
  }

  @Mutation(() => Multimedia)
  removeMultimedia(@Args('id', { type: () => Int }) id: number) {
    return this._service.remove(id)
  }
}
