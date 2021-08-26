import { Module } from '@nestjs/common'

import { PortfolioModule } from './portfolio/portfolio.module'
import { JobModule } from './job/job.module';
import { LanguageModule } from './language/language.module'
import { ProfileSkillModule } from './profile-skill/profile-skill.module';

@Module({
  imports: [PortfolioModule, LanguageModule, ProfileSkillModule,JobModule]
})
export class ClientModule {}
