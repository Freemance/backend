import { DataModule } from '@feature/core'
import { Module } from '@nestjs/common'

import { UserResolver, UserService } from '.'
import { EmailService, PasswordService } from '@feature/auth'

@Module({
  imports: [DataModule],
  providers: [UserResolver, UserService, PasswordService, EmailService],
})
export class UserModule {}
