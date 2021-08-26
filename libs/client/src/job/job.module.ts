import { Module } from '@nestjs/common';
import { JobService } from './service/job.service';
import { JobResolver } from './resolver/job.resolver';
import { DataModule } from '@feature/core'

@Module({
  imports: [DataModule],
  providers: [JobResolver, JobService]
})
export class JobModule {}
