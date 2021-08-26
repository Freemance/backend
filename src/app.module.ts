import { AuthModule } from '@feature/auth/auth.module'
import { CoreModule, DataModule } from '@feature/core'
import { Module } from '@nestjs/common'

@Module({
  imports: [CoreModule, DataModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
