import { Module } from '@nestjs/common'
import { DataModule } from '@feature/core'
import { ProfileSkillResolver, ProfileSkillService } from '.'

@Module({
  imports: [DataModule],
  providers: [ProfileSkillResolver, ProfileSkillService],
})
export class ProfileSkillModule {}
