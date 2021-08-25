import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { PortfolioModule } from './portfolio/portfolio.module'
import { JobModule } from './job/job.module';

@Module({
  providers: [ClientService],
  exports: [ClientService],
  imports: [PortfolioModule, JobModule],
})
export class ClientModule {}
