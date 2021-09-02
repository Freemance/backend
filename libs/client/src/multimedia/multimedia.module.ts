import { Module } from '@nestjs/common'
import { MultimediaResolver } from './resolver/multimedia.resolver'
import { MultimediaService } from './service/multimedia.service'

@Module({
  providers: [MultimediaResolver, MultimediaService],
})
export class MultimediaModule {}
