import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { PortfolioModule } from './portfolio/portfolio.module'
import { LanguageModule } from './language/language.module'
import { ProfileSkillModule } from './profile-skill/profile-skill.module';

@Module({
  providers: [ClientService],
  exports: [ClientService],
  imports: [PortfolioModule, LanguageModule, ProfileSkillModule],
})
export class ClientModule {}
