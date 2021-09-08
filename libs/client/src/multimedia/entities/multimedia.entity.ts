import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'

@ObjectType()
export class Multimedia extends BaseModel {
  @Field(() => Int, { description: 'Id of the user)', nullable: true })
  createdBy: number

  @Field({ description: 'Name of the file', nullable: true })
  filename?: string

  @Field({ description: 'Path of the file', nullable: true })
  path?: string

  @Field({ description: 'Size of the file', nullable: true })
  size?: string

  @Field({ description: 'Type of the file', nullable: true })
  type?: string

  @Field({ description: 'Extension of the file', nullable: true })
  extension?: string

  @Field({ description: 'Status of the file ' })
  status: boolean
}
