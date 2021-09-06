import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateJobInput {
  @Field({ description: 'Name of the job' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string

  @Field({ description: 'Company associated  to the job', nullable: true })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  company: string

  @Field({ description: 'Description associated  to the job', nullable: true })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string

  @Field(() => Date, { description: 'Start date associated  to the job' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @Field(() => Date, { description: 'End date associated  to the job', nullable: true })
  @IsDate()
  @IsOptional()
  endDate?: Date
}
