import { ObjectType, Field } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'

@ObjectType()
export class Tag extends BaseModel {
  @Field({ description: 'Tag name' })
  name: string
}
