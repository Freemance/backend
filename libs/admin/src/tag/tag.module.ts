import { Module } from '@nestjs/common'
import { DataModule } from '@feature/core'
import { TagResolver, TagService } from '.'

@Module({
  imports: [DataModule],
  providers: [TagResolver, TagService],
})
export class TagModule {}
