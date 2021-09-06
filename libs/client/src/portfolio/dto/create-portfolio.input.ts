import { InputType, Field } from '@nestjs/graphql'
import { IsArray, IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreatePortfolioInput {
  @Field({ description: 'Name of the proyect' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(75)
  proyect: string

  @Field({ description: 'Link associated  to the proyect', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(75)
  link: string

  @Field({ description: 'Description associated  to the proyect', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string

  @Field(() => [String], { description: 'List of screenshts associated to the proyect', nullable: true })
  screenshts: [string]

  @Field(() => Date, { description: 'Start date associated  to the proyect' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @Field(() => Date, { description: 'End date associated  to the proyect' })
  @IsDate()
  @IsNotEmpty()
  endDate: Date
}
