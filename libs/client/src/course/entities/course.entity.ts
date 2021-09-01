import { ObjectType, Field } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'

@ObjectType()
export class Course extends BaseModel {
  @Field({ description: 'Course name' })
  course: string

  @Field({ description: 'Institution name' })
  institution: string

  @Field({ description: 'Description associated  to the course', nullable: true })
  description?: string

  @Field(() => Date, { description: 'Start date associated  to the course' })
  startDate: Date

  @Field(() => Date, { description: 'End date associated  to the course' })
  endDate: Date

  @Field(() => Profile, { description: 'Profile associated  to the course', nullable: true })
  profile?: Profile
}
