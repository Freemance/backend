import { Module } from '@nestjs/common'

import { DataModule } from '@feature/core'
import { LanguageResolver, LanguageService } from '.'

@Module({
  imports: [DataModule],
  providers: [LanguageResolver, LanguageService],
})
export class LanguageModule {}
