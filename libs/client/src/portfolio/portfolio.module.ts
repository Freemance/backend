import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'
import { PortfolioResolver, PortfolioService } from '.'

@Module({
  imports: [DataModule],
  providers: [PortfolioResolver, PortfolioService],
})
export class PortfolioModule {}
