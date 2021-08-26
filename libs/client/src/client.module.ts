import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { PortfolioModule } from './portfolio/portfolio.module'
import { LanguageModule } from './language/language.module'
import { CourseModule } from './course/course.module'

@Module({
  providers: [ClientService],
  exports: [ClientService],
  imports: [PortfolioModule, LanguageModule, CourseModule],
})
export class ClientModule {}
