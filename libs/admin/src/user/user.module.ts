import { Module } from '@nestjs/common'
import { UserResolver, UserService } from '.';

@Module({
  providers: [UserResolver, UserService],
})
export class UserModule {}
