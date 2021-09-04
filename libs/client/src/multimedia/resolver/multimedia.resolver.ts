import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { MultimediaService } from './../service/multimedia.service'
import { Multimedia } from '../entities/multimedia.entity'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'

@Resolver(() => Multimedia)
export class MultimediaResolver {
  constructor(private readonly _service: MultimediaService) {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    )
  }

  /*@UseGuards(RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Multimedia || Boolean, { name: 'CreateMultimedia' })
  createMultimedia(
    @UserEntity() user: User,
    @Args({ name: 'file', type: () => GraphQLUpload }) { createReadStream, filename }: FileUpload,
  ): Promise<Multimedia | boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => {
          const input: CreateMultimediaInput = {
            file_path: `./uploads/${filename}`,
            file_name: filename,
            // file_extension: metadata.file_extension,
            // file_height: metadata.file_height,
            // file_size: metadata.file_size,
            // file_type: metadata.file_type,
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

  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Boolean, { name: 'DeleteMultimediaByUser' })
  deleteMultimediaByUser(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.deleteMultimediaByUser(id, user.profile.id)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Boolean, { name: 'DeleteMultimediaByAdmin' })
  deleteMultimediaByAdmin(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteMultimediaByAdmin(id)
  }*/
}
