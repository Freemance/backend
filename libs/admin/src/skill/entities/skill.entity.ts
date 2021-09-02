import { Field, ObjectType } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'

@ObjectType()
export class Skill extends BaseModel {
  @Field({ description: 'Skill name' })
  name: string
}
