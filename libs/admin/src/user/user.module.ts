import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'

import { UserResolver, UserService } from '.'
import { PasswordService } from '@feature/auth'

@Module({
  imports: [DataModule],
  providers: [UserResolver, UserService, PasswordService],
})
export class UserModule {}
