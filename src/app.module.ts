import { Module } from '@nestjs/common'
import { AdminModule } from '@feature/admin'
import { AuthModule } from '@feature/auth/auth.module'
import { ClientModule } from '@feature/client'
import { CoreModule, DataModule } from '@feature/core'

@Module({
  imports: [CoreModule, DataModule, AuthModule, ClientModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
