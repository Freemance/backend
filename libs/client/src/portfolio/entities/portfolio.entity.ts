import { ObjectType, Field } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'
import { Skill } from '@feature/admin'

@ObjectType()
export class Portfolio extends BaseModel {
  @Field({ description: 'Name of the proyect', nullable: true })
  proyect?: string

  @Field({ description: 'Link associated to the proyect', nullable: true })
  link?: string

  @Field({ description: 'Description associated to the proyect', nullable: true })
  description?: string

  @Field(() => [String], { description: 'Screenshots associated to the proyect', nullable: true })
  screenshts: [string]

  @Field(() => Date, { description: 'Start date associated to the proyect' })
  startDate?: Date

  @Field(() => Date, { description: 'End date associated to the proyect' })
  endDate?: Date

  @Field(() => [Skill], { description: 'Skills associated to the proyect', nullable: true })
  skills?: [Skill]
}
