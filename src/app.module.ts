import { CoreModule, DataModule } from '@feature/core'
import { Module } from '@nestjs/common'
import { AuthModule } from '@feature/auth'

@Module({
  imports: [CoreModule, DataModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
