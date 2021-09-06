import { Module } from '@nestjs/common'
import { CourseModule } from './course'
import { JobModule } from './job'
import { LanguageModule } from './language'
import { PortfolioModule } from './portfolio'
import { ProfileModule } from './profile'
import { MultimediaModule } from './multimedia/multimedia.module'
import { SocialLinksModule } from './social-links'

@Module({
  imports: [
    PortfolioModule,
    LanguageModule,
    JobModule,
    CourseModule,
    ProfileModule,
    MultimediaModule,
    SocialLinksModule,
  ],
})
export class ClientModule {}
