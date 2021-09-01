import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { Role, Roles, GqlAuthGuard, RolesGuard, UserEntity, User } from '@feature/auth'
import { CreateLanguageInput } from '../dto/create-language.input'
import { UpdateLanguageInput } from '../dto/update-language.input'
import { Language } from '../entities/language.entity'
import { LanguageService } from '../service/language.service'

@UseGuards(RolesGuard)
@Roles(Role.USER)
@UseGuards(GqlAuthGuard)
@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly _service: LanguageService) {}

  @Query(() => [Language], { name: 'ProfileLangs', nullable: 'items' })
  getAllLanguage(@UserEntity() user: User) {
    return this._service.getAllProfileLangs(user.profile.id)
  }

  @Query(() => Language, { name: 'getProfileLangById', nullable: true })
  getProfileLangById(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.getProfileLangById(id, user.profile.id)
  }

  @Mutation(() => Language, { name: 'ProfileCreateLang', nullable: true })
  createProfileLang(@UserEntity() user: User, @Args('input') input: CreateLanguageInput) {
    return this._service.createProfileLang(user.profile.id, input)
  }

  @Mutation(() => Language, { name: 'ProfileUpdateLang', nullable: true })
  updateProfileLang(
    @UserEntity() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateLanguageInput,
  ) {
    return this._service.updateProfileLang(id, user.profile.id, input)
  }

  @Mutation(() => Boolean, { name: 'ProfileDeleteLang', nullable: true })
  deleteLanguage(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.deleteProfileLang(id, user.profile.id)
  }
}
