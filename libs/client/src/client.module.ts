import { Module } from '@nestjs/common'

import { PortfolioModule } from './portfolio/portfolio.module'
import { JobModule } from './job/job.module';
import { LanguageModule } from './language/language.module'
import { CourseModule } from './course/course.module'
import { ProfileSkillModule } from './profile-skill/profile-skill.module';

@Module({
  imports: [PortfolioModule, LanguageModule, ProfileSkillModule,JobModule,CourseModule]
})
export class ClientModule {}
