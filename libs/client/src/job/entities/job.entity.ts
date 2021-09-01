import { ObjectType, Field } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'

@ObjectType()
export class Job extends BaseModel {
  @Field({ description: 'Job name' })
  name: string

  @Field({ description: 'Company associated  to the job', nullable: true })
  company?: string

  @Field({ description: 'Description associated  to the job', nullable: true })
  description?: string

  @Field(() => Date, { description: 'Start date associated  to the job' })
  startDate: Date

  @Field(() => Date, { description: 'End date associated  to the job', nullable: true })
  endDate?: Date

  @Field(() => Boolean, { description: 'Checks if the jobs is still in progress, default is false', nullable: true })
  inProgress: boolean
}
