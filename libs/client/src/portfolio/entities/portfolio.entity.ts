import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'
import { IsArray, IsDate, IsString } from 'class-validator'
import { Skill } from '@feature/admin'

@ObjectType()
export class Portfolio extends BaseModel {
  @Field({ description: 'Name of the proyect', nullable: true })
  @IsString()
  proyect?: string

  @Field({ description: 'Link associated  to the proyect', nullable: true })
  @IsString()
  link?: string

  @Field({ description: 'Description associated  to the proyect', nullable: true })
  @IsString()
  description?: string

  @Field(() => [Skill], { description: 'Description associated  to the proyect', nullable: true })
  @IsArray()
  skills?: [Skill]

  @Field(() => Date, { description: 'Start date associated  to the proyect', nullable: true })
  @IsDate()
  startDate?: Date

  @Field(() => Date, { description: 'End date associated  to the proyect', nullable: true })
  @IsDate()
  endDate?: Date

  @Field(() => Profile, { description: 'Profile associated  to the proyect', nullable: true })
  profile?: Profile
}
