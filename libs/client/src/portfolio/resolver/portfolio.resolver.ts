import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Portfolio } from './../entities/portfolio.entity'
import { PortfolioService } from '../service/portfolio.service'
import { CreatePortfolioInput } from '../dto/create-portfolio.input'
import { UpdatePortfolioInput } from '../dto/update-portfolio.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard, Role, Roles, RolesGuard, UserEntity, User } from '@feature/auth'

@UseGuards(RolesGuard)
@Roles(Role.USER)
@UseGuards(GqlAuthGuard)
@Resolver(() => Portfolio)
export class PortfolioResolver {
  constructor(private readonly _service: PortfolioService) {}

  @Query(() => [Portfolio], { name: 'ProfilePortfolios', nullable: 'items' })
  getProfilePortfolioItems(@UserEntity() user: User) {
    return this._service.getProfilePortfolioItems(user.profile.id)
  }

  @Mutation(() => Portfolio, { name: 'ProfileCreatePortfolio', nullable: true })
  createProfilePortfolio(@UserEntity() user: User, @Args('input') input: CreatePortfolioInput) {
    return this._service.createProfilePortfolio(user.profile.id, input)
  }

  @Query(() => Portfolio, { name: 'ProfilePortfolioById', nullable: true })
  getProfilePortfolioById(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.getProfilePortfolioById(id, user.profile.id)
  }

  @Mutation(() => Portfolio, { name: 'ProfileUpdatePortfolio', nullable: true })
  updateProfilePortfolio(
    @UserEntity() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePortfolioInput,
  ) {
    return this._service.updateProfilePortfolio(id, user.profile.id, input)
  }

  @Mutation(() => Boolean, { name: 'ProfileDeletePortfolio', nullable: true })
  deleteProfilePortfolio(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.deleteProfilePortfolio(id, user.profile.id)
  }
}
