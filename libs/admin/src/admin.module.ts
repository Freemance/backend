import { Module } from '@nestjs/common'
import { SkillModule } from './skill'
import { TagModule } from './tag/tag.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [SkillModule, TagModule, UserModule],
  providers: [],
  exports: [],
})
export class AdminModule {}
