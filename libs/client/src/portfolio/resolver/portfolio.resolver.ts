import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Portfolio } from './../entities/portfolio.entity'
import { PortfolioService } from '../service/portfolio.service'
import { CreatePortfolioInput } from '../dto/create-portfolio.input'
import { UpdatePortfolioInput } from '../dto/update-portfolio.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard, Role, Roles, RolesGuard, UserEntity, User } from '@feature/auth'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@UseGuards(RolesGuard)
@Roles(Role.USER)
@UseGuards(GqlAuthGuard)
@Resolver(() => Portfolio)
export class PortfolioResolver {
  constructor(private readonly _service: PortfolioService) {}

  @Query(() => [Portfolio], { name: 'profilePortfolios', nullable: 'items' })
  getProfilePortfolioItems(@UserEntity() user: User) {
    return this._service.getProfilePortfolioItems(user.profile.id)
  }

  @Mutation(() => Portfolio, { name: 'profileCreatePortfolio', nullable: true })
  createProfilePortfolio(
    @UserEntity() user: User,
    @Args('input') input: CreatePortfolioInput,
    @Args({ name: 'files', type: () => [GraphQLUpload], nullable: true })
    files: [FileUpload],
  ) {
    return this._service.createProfilePortfolio(user.profile.id, input, files)
  }

  @Query(() => Portfolio, { name: 'profilePortfolioById', nullable: true })
  getProfilePortfolioById(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.getProfilePortfolioById(id, user.profile.id)
  }

  @Mutation(() => Portfolio, { name: 'profileUpdatePortfolio', nullable: true })
  updateProfilePortfolio(
    @UserEntity() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePortfolioInput,
    @Args({ name: 'files', type: () => [GraphQLUpload], nullable: true })
    files: [FileUpload],
  ) {
    return this._service.updateProfilePortfolio(id, user.profile.id, input, files)
  }

  @Mutation(() => Portfolio, { name: 'profilePortfolioAddSkill', nullable: true })
  addPortfolioSkill(
    @UserEntity() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('skillId', { type: () => Int }) skillId: number,
  ) {
    return this._service.addPortfolioSkill(id, user.profile.id, skillId)
  }
  @Mutation(() => Portfolio, { name: 'profilePortfolioRemoveSkill', nullable: true })
  removePortfolioSkill(
    @UserEntity() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('skillId', { type: () => Int }) skillId: number,
  ) {
    return this._service.removePortfolioSkill(id, user.profile.id, skillId)
  }

  @Mutation(() => Boolean, { name: 'profileDeletePortfolio', nullable: true })
  deleteProfilePortfolio(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.deleteProfilePortfolio(id, user.profile.id)
  }
}
