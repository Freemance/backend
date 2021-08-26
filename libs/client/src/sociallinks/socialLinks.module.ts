import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'
import { SocialLinksResolver, SocialLinksService } from '.'

@Module({
  imports: [DataModule],
  providers: [SocialLinksService, SocialLinksResolver],
})
export class SocialLinksModule {}
