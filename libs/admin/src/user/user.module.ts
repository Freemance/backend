import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'

import { UserService } from './service/user.service'
import { UserResolver } from './resolver/user.resolver'
import { PasswordService } from '@feature/auth'

@Module({
  imports: [DataModule],
  providers: [UserResolver, UserService, PasswordService],
})
export class UserModule {}
