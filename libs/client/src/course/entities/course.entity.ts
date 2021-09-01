import { ObjectType, Field } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'

@ObjectType()
export class Course extends BaseModel {
  @Field({ description: 'Course name' })
  course: string

  @Field({ description: 'Institution name', nullable: true })
  institution?: string

  @Field(() => Date, { description: 'Start date associated  to the course', nullable: true })
  startDate?: Date

  @Field(() => Date, { description: 'End date associated  to the course', nullable: true })
  endDate?: Date

  @Field(() => Profile, { description: 'Profile associated  to the course', nullable: true })
  profile?: Profile
}
