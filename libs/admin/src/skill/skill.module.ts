import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'
import { SkillResolver } from './resolver/skill.resolver'
import { SkillService } from './service/skill.service'

@Module({
  imports: [DataModule],
  providers: [SkillService, SkillResolver],
  exports: [],
})
export class SkillModule {}
