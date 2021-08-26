import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateCourseInput {
  @Field({ description: 'Course name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  course: string

  @Field({ description: 'Institution name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  institution: string

  @Field(() => Date, { description: 'Start date associated  to the course' })
  @IsNotEmpty()
  @IsDate()
  startDate: Date

  @Field(() => Date, { description: 'End date associated  to the course' })
  @IsNotEmpty()
  @IsDate()
  endDate: Date
}
