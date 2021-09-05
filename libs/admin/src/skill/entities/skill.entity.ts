import { Field, HideField, ObjectType } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'

@ObjectType()
export class Skill extends BaseModel {
  @Field({ description: 'Skill name' })
  name: string

  @Field({ description: 'Skill icon' })
  icon: string

  @HideField()
  @Field(() => [Profile], { description: 'Profiles asociated to Skill', nullable: 'items' })
  profiles: Profile[]
}
