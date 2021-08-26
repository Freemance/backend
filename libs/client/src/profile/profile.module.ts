import { Module } from '@nestjs/common'
import { DataModule } from '@feature/core'
import { ProfileResolver, ProfileService } from '.'

@Module({
  imports: [DataModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
