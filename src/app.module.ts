import { CoreModule, DataModule } from '@feature/core'
import { Module } from '@nestjs/common'

@Module({
  imports: [CoreModule, DataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
