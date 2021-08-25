import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { PortfolioModule } from './portfolio/portfolio.module'

@Module({
  providers: [ClientService],
  exports: [ClientService],
  imports: [PortfolioModule],
})
export class ClientModule {}
