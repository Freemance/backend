import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Portfolio } from './../entities/portfolio.entity'
import { PortfolioService } from '../service/portfolio.service'
import { CreatePortfolioInput } from '../dto/create-portfolio.input'
import { UpdatePortfolioInput } from '../dto/update-portfolio.input'

@Resolver(() => Portfolio)
export class PortfolioResolver {
  constructor(private readonly service: PortfolioService) {}

  @Mutation(() => Portfolio, { nullable: true })
  createPortfolio(@Args('input') input: CreatePortfolioInput) {
    return this.service.createPortfolio(input)
  }

  @Query(() => [Portfolio], { name: 'portfolios', nullable: 'items' })
  getAllPortfolio() {
    return this.service.getAllPortfolio()
  }

  @Query(() => Portfolio, { name: 'portfolio', nullable: true })
  getPortfolioById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getPortfolioById(id)
  }

  @Mutation(() => Portfolio, { nullable: true })
  updatePortfolio(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdatePortfolioInput) {
    return this.service.updatePortfolio(id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  deletePortfolio(@Args('id', { type: () => Int }) id: number) {
    return this.service.deletePortfolio(id)
  }
}
