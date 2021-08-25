import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import { TagResolver } from './resolver/tag.resolver';

@Module({
  providers: [TagResolver, TagService]
})
export class TagModule {}
