import { CreatePortfolioInput } from './create-portfolio.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePortfolioInput extends PartialType(CreatePortfolioInput) {
  @Field(() => Int)
  id: number
}
