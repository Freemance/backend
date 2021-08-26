import { Module } from '@nestjs/common'
import { DataModule } from '@feature/core'
import { JobResolver, JobService } from '.'

@Module({
  imports: [DataModule],
  providers: [JobResolver, JobService],
})
export class JobModule {}
