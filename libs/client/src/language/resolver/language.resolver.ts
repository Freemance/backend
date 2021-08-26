import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LanguageService } from './language.service';
import { Language } from './entities/language.entity';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly languageService: LanguageService) {}

  @Mutation(() => Language)
  createLanguage(@Args('createLanguageInput') createLanguageInput: CreateLanguageInput) {
    return this.languageService.create(createLanguageInput);
  }

  @Query(() => [Language], { name: 'language' })
  findAll() {
    return this.languageService.findAll();
  }

  @Query(() => Language, { name: 'language' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.languageService.findOne(id);
  }

  @Mutation(() => Language)
  updateLanguage(@Args('updateLanguageInput') updateLanguageInput: UpdateLanguageInput) {
    return this.languageService.update(updateLanguageInput.id, updateLanguageInput);
  }

  @Mutation(() => Language)
  removeLanguage(@Args('id', { type: () => Int }) id: number) {
    return this.languageService.remove(id);
  }
}
