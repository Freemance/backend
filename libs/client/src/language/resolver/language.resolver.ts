import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateLanguageInput } from '../dto/create-language.input'
import { UpdateLanguageInput } from '../dto/update-language.input'
import { Language } from '../entities/language.entity'
import { LanguageService } from '../service/language.service'

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly service: LanguageService) {}

  @Mutation(() => Language, { nullable: true })
  createLanguage(@Args('input') input: CreateLanguageInput) {
    return this.service.createLanguage(input)
  }

  @Query(() => [Language], { name: 'languages', nullable: 'items' })
  getAllLanguage() {
    return this.service.getAllLanguage()
  }

  @Query(() => Language, { name: 'language', nullable: true })
  getLanguageById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getLanguageById(id)
  }

  @Mutation(() => Language, { nullable: true })
  updateLanguage(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateLanguageInput) {
    return this.service.updateLanguage(id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  deleteLanguage(@Args('id', { type: () => Int }) id: number) {
    return this.service.deleteLanguage(id)
  }
}
