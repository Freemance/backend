import { Field, HideField, ObjectType } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'

@ObjectType()
export class Skill extends BaseModel {
  @Field({ description: 'Skill name' })
  name: string

  @Field(() => [String], { description: 'Skill icon paths', nullable: true })
  icon: [string]

  @HideField()
  @Field(() => [Profile], { description: 'Profiles asociated to Skill', nullable: true })
  profiles: Profile[]
}
