import { Module } from '@nestjs/common'
import { CourseModule } from './course'
import { JobModule } from './job'
import { LanguageModule } from './language'
import { PortfolioModule } from './portfolio'
import { ProfileModule } from './profile'
import { ProfileSkillModule } from './profile-skill'
// import { SocialLinksModule } from './social-links'

@Module({
  imports: [
    PortfolioModule,
    LanguageModule,
    ProfileSkillModule,
    JobModule,
    CourseModule,
    ProfileModule,
    // SocialLinksModule,
  ],
})
export class ClientModule {}
