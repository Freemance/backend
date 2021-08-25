import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'
import { SkillResolver, SkillService } from '.'

@Module({
  imports: [DataModule],
  providers: [SkillService, SkillResolver],
  exports: [],
})
export class SkillModule {}
