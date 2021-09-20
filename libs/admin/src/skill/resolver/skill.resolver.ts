import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Skill } from '../entities/skill.entity'
import { SkillConnection } from '../entities/skill-connection.model'
import { SkillService } from '../service/skill.service'
import { CreateSkillInput } from '../dto/create-skill.input'
import { UpdateSkillInput } from '../dto/update-skill.input'
import { SkillOrder } from '../dto/skill-order.input'
import { PaginationArgs } from '@feature/core'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@Resolver()
export class SkillResolver {
  constructor(private readonly _service: SkillService) {}

  @Query(() => SkillConnection)
  async filterSkills(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => SkillOrder,
      nullable: true,
    })
    orderBy: SkillOrder,
  ) {
    return this._service.filter(after, before, first, last, query, orderBy)
  }

  @Query(() => Skill, { nullable: true })
  getSkillById(@Args('id', { type: () => Int }) id: number) {
    return this._service.getSkillById(id)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Skill, { nullable: true })
  createSkill(@Args('input') input: CreateSkillInput) {
    return this._service.createSkill(input)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Skill, { nullable: true })
  updateSkill(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateSkillInput) {
    return this._service.updateSkill(id, input)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Boolean, { nullable: true })
  deleteSkill(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteSkill(id)
  }
}
