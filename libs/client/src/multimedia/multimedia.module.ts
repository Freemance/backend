import { Module } from '@nestjs/common'
import { DataModule } from '@feature/core'
import { MultimediaResolver } from './resolver/multimedia.resolver'
import { MultimediaService } from './service/multimedia.service'

@Module({
  imports: [DataModule],
  providers: [MultimediaResolver, MultimediaService],
  exports: [MultimediaService],
})
export class MultimediaModule {}
