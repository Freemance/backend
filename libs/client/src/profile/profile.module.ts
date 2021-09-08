import { MultimediaService } from '@feature/client/multimedia'
import { Module } from '@nestjs/common'
import { DataModule } from '@feature/core'
import { ProfileResolver, ProfileService } from '.'

@Module({
  imports: [DataModule],
  providers: [ProfileResolver, ProfileService, MultimediaService],
})
export class ProfileModule {}
