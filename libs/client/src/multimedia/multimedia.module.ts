import { Module } from '@nestjs/common'
import { MultimediaService } from './multimedia.service'
import { MultimediaResolver } from './multimedia.resolver'

@Module({
  providers: [MultimediaResolver, MultimediaService],
})
export class MultimediaModule {}
