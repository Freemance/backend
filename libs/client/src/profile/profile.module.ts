import { MultimediaService } from '@feature/client/multimedia'
import { Module } from '@nestjs/common'
import { DataModule } from '@feature/core'
import { ProfileResolver, ProfileService } from '.'
import { EmailService } from '@feature/auth'

@Module({
  imports: [DataModule],
  providers: [ProfileResolver, ProfileService, MultimediaService, EmailService],
})
export class ProfileModule {}
