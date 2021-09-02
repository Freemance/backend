import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'

@ObjectType()
export class Multimedia extends BaseModel {
  @Field(() => Int, { description: 'Id of the user)' })
  created_by: number

  @Field({ description: 'Name of the file', nullable: true })
  file_name?: string

  @Field({ description: 'Path of the file', nullable: true })
  file_path?: string

  @Field({ description: 'Size of the file', nullable: true })
  file_size?: string

  @Field({ description: 'Type of the file', nullable: true })
  file_type?: string

  @Field({ description: 'Extension of the file', nullable: true })
  file_extension?: string

  @Field({ description: 'Height of the file', nullable: true })
  file_height?: string

  @Field({ description: 'Status of the file ' })
  status: boolean
}
