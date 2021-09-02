import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { MultimediaService } from './../service/multimedia.service'
import { Multimedia } from '../entities/multimedia.entity'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'
import { createWriteStream } from 'fs'
@UseGuards(GqlAuthGuard)
@Resolver(() => Multimedia)
export class MultimediaResolver {
  constructor(private readonly _service: MultimediaService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Multimedia || Boolean)
  createMultimedia(
    @UserEntity() user: User,
    @Args({ name: 'file', type: () => GraphQLUpload }) { createReadStream, filename, metadata }: FileUpload,
  ): Promise<Multimedia | boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => {
          const input: CreateMultimediaInput = {
            file_path: `./uploads/${filename}`,
            file_name: filename,
            file_extension: metadata.file_extension,
            file_height: metadata.file_height,
            file_size: metadata.file_size,
            file_type: metadata.file_type,
            status: true,
          }
          console.log(input)
          return resolve(this._service.createMultimedia(user.profile.id, input))
        })
        .on('error', () => reject(false)),
    )
  }

  @Query(() => [Multimedia], { name: 'GetAllMultimedias' })
  getAllMultimedias() {
    return this._service.getAllMultimedias()
  }

  @Mutation(() => Boolean, { name: 'DeleteMultimediaByUser' })
  deleteMultimediaByUser(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.deleteMultimediaByUser(id, user.profile.id)
  }

  @Mutation(() => Boolean, { name: 'RemoveMultimediaByUser' })
  deleteMultimediaByAdmin(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteMultimediaByAdmin(id)
  }
}
