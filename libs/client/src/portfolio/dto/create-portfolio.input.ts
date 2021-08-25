import { InputType, Int, Field, GraphQLISODateTime } from '@nestjs/graphql'
import { Portfolio } from '@feature/client/portfolio'
import { IsDate, IsString } from 'class-validator'

@InputType()
export class CreatePortfolioInput {
  @Field({ description: 'Name of the proyect', nullable: true })
  @IsString()
  proyect?: string

  @Field({ description: 'Link associated  to the proyect', nullable: true })
  @IsString()
  link?: string

  @Field({ description: 'Description associated  to the proyect', nullable: true })
  @IsString()
  description?: string

  @Field(() => GraphQLISODateTime, { description: 'Start date associated  to the proyect', nullable: true })
  @IsDate()
  startDate?: Date

  @Field(() => GraphQLISODateTime, { description: 'End date associated  to the proyect', nullable: true })
  @IsDate()
  endDate?: Date
}
