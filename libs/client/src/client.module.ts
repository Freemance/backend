import { Module } from '@nestjs/common'
import {
  CourseModule,
  JobModule,
  LanguageModule,
  PortfolioModule,
  ProfileModule,
  ProfileSkillModule,
  SocialLinksModule,
} from '.'

@Module({
  imports: [
    PortfolioModule,
    LanguageModule,
    ProfileSkillModule,
    JobModule,
    CourseModule,
    ProfileModule,
    SocialLinksModule,
  ],
})
export class ClientModule {}
