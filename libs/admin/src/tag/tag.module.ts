import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import { TagResolver } from './resolver/tag.resolver';
import { DataModule } from '@feature/core';

@Module({
  imports: [DataModule],
  providers: [TagResolver, TagService]
})
export class TagModule {}
