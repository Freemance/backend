import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator'

@InputType()
export class CreateCourseInput {
  @Field({ description: 'Course name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  course: string

  @Field({ description: 'Institution/Plataform name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  institution: string

  @Field({ description: 'Description associated  to the course', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  description?: string

  @Field(() => Date, { description: 'Start date associated  to the course' })
  @IsNotEmpty()
  @IsDate()
  startDate: Date

  @Field(() => Date, { description: 'End date associated  to the course' })
  @IsNotEmpty()
  @IsDate()
  endDate: Date
}
