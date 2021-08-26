import { Module } from '@nestjs/common'
import { LanguageResolver, LanguageService } from '.'

@Module({
  providers: [LanguageResolver, LanguageService],
})
export class LanguageModule {}
