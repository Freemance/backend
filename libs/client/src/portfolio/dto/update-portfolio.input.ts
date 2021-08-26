import { CreatePortfolioInput } from './create-portfolio.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePortfolioInput extends PartialType(CreatePortfolioInput) {}
