import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { SkillModule } from './skill/skill.module'
import { TagModule } from './tag/tag.module';

@Module({
  providers: [AdminService],
  exports: [AdminService],
  imports: [SkillModule, TagModule],
})
export class AdminModule {}
