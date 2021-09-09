import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'
import { SkillResolver, SkillService } from '.'
import { MultimediaService } from '@feature/client/multimedia'

@Module({
  imports: [DataModule],
  providers: [SkillService, SkillResolver, MultimediaService],
  exports: [],
})
export class SkillModule {}
