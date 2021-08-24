import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { SkillModule } from './skill/skill.module';

@Module({
  providers: [AdminService],
  exports: [AdminService],
  imports: [SkillModule],
})
export class AdminModule {}
