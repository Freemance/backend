import { InputType, Field } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateJobInput {
  @Field({ description: 'Name of the job' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string

  @Field({ description: 'Company associated  to the job' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  company: string

  @Field({ description: 'Description associated  to the job' })
  @IsString()
  @MaxLength(500)
  description: string

  @Field(() => Date, { description: 'Start date associated  to the job' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @Field(() => Date, { description: 'End date associated  to the job' })
  @IsDate()
  @IsNotEmpty()
  endDate: Date
}
