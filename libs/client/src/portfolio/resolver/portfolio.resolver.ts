import { ParseIntPipe } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CreatePortfolioInput, Portfolio, PortfolioService } from '..'

@Resolver(() => Portfolio)
export class PortfolioResolver {
  constructor(private readonly service: PortfolioService) {}

  @Mutation(() => Portfolio)
  createPortfolio(@Args('input') input: CreatePortfolioInput) {
    return this.service.createPortfolio(input)
  }

  @Query(() => [Portfolio], { name: 'portfolios' })
  getAllPortfolio() {
    return this.service.getAllPortfolio()
  }

  @Query(() => Portfolio, { name: 'portfolio' })
  getPortfolioById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getPortfolioById(id)
  }

  @Mutation(() => Portfolio)
  updatePortfolio(@Args('id', { type: () => Int }) id: number, @Args('input') input: CreatePortfolioInput) {
    return this.service.updatePortfolio(id, input)
  }

  @Mutation(() => Boolean)
  deletePortfolio(@Args('id', { type: () => Int }) id: number) {
    return this.service.deletePortfolio(id)
  }
}
