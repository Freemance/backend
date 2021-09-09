import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'
import { PortfolioResolver, PortfolioService } from '.'
import { MultimediaService } from '@feature/client/multimedia'

@Module({
  imports: [DataModule],
  providers: [PortfolioResolver, PortfolioService, MultimediaService],
})
export class PortfolioModule {}
