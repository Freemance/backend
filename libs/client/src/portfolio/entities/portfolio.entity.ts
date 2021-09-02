import { ObjectType, Field, Int } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'
import { Skill } from '@feature/admin'
import { Profile } from '@feature/client'

@ObjectType()
export class Portfolio extends BaseModel {
  @Field({ description: 'Name of the proyect' })
  proyect?: string

  @Field({ description: 'Link associated to the proyect', nullable: true })
  link?: string

  @Field({ description: 'Description associated to the proyect', nullable: true })
  description?: string

  @Field(() => [Skill], { description: 'Description associated to the proyect', nullable: true })
  skills?: [Skill]

  @Field(() => Date, { description: 'Start date associated to the proyect' })
  startDate?: Date

  @Field(() => Date, { description: 'End date associated to the proyect' })
  endDate?: Date
}
