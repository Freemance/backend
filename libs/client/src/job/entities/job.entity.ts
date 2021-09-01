import { ObjectType, Field } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'
import { IsBoolean, IsDate, IsString } from 'class-validator'

@ObjectType()
export class Job extends BaseModel {
  @Field({ description: 'Job name' })
  @IsString()
  name: string

  @Field({ description: 'Company associated  to the job', nullable: true })
  @IsString()
  company?: string

  @Field({ description: 'Description associated  to the job', nullable: true })
  @IsString()
  description?: string

  @Field(() => Date, { description: 'Start date associated  to the job' })
  @IsDate()
  startDate: Date

  @Field(() => Date, { description: 'End date associated  to the job', nullable: true })
  @IsDate()
  endDate?: Date

  @Field(() => Boolean, { description: 'Checks if the jobs is still in progress, default is false', nullable: true })
  @IsBoolean()
  inProgress: boolean

  @Field(() => Profile, { description: 'Profiles asociated to Jobs', nullable: true })
  profile?: Profile
}
