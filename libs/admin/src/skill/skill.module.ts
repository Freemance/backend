import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'

@Module({
  imports: [DataModule],
  providers: [],
  exports: [],
})
export class SkillModule {}
