import { Field, HideField, ObjectType } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'
import { ProfileSkill } from '@feature/client'

@ObjectType()
export class Skill extends BaseModel {
  @Field({ description: 'Skill name' })
  name: string

  @HideField()
  @Field(() => [ProfileSkill], { description: 'Profiles asociated to Skill', nullable: 'items' })
  profiles: ProfileSkill[]
}
