import { Module } from '@nestjs/common';
import { JobService } from './service/job.service';
import { JobResolver } from './resolver/job.resolver';

@Module({
  providers: [JobResolver, JobService]
})
export class JobModule {}
