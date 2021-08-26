import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageResolver } from './language.resolver';

@Module({
  providers: [LanguageResolver, LanguageService]
})
export class LanguageModule {}
