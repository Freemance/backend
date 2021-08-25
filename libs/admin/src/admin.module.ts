import { Module } from '@nestjs/common'
import { SkillModule } from './skill'
import { TagModule } from './tag/tag.module'

@Module({
  imports: [SkillModule, TagModule],
  providers: [],
  exports: [],
})
export class AdminModule {}
