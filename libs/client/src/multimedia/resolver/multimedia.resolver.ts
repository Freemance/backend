import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { MultimediaService } from './../service/multimedia.service'
import { Multimedia } from '../entities/multimedia.entity'

@Resolver(() => Multimedia)
export class MultimediaResolver {
  constructor(private readonly _service: MultimediaService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Multimedia)
  async uploadFile(
    @UserEntity() user: User,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    return this._service.saveMultimedia(user.profile.id, file)
  }

  @Query(() => [Multimedia], { name: 'GetAllMultimedias' })
  getAllMultimedias() {
    return this._service.getAllMultimedias()
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Boolean, { name: 'DeleteMultimediaByUser' })
  deleteMultimediaByUser(@UserEntity() user: User, @Args('filename') filename: string) {
    return this._service.deleteMultimediaByUser(user.profile.id, filename)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Boolean, { name: 'DeleteMultimediaByAdmin' })
  deleteMultimediaByAdmin(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteMultimediaByAdmin(id)
  }
}
