import { Field, ObjectType } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'
import { Portfolio } from '@feature/client'

@ObjectType()
export class Skill extends BaseModel {
  @Field({ description: 'Skill name' })
  name: string

  @Field(() => [Profile], { description: 'Profiles asociated to Skill', nullable: 'items' })
  profiles: Profile[]

  @Field({ description: 'Portfolio id asociated to Skill', nullable: true })
  portfolio?: Portfolio
}
