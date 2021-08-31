import { Module } from '@nestjs/common'
import { SkillModule, TagModule, UserModule } from '.'

@Module({
  imports: [SkillModule, TagModule, UserModule],
  providers: [],
  exports: [],
})
export class AdminModule {}
