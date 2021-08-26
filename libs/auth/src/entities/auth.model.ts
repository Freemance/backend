import { ObjectType } from '@nestjs/graphql'
import { User } from './user.entity'
import { Token } from './token.model'

@ObjectType()
export class Auth extends Token {
  user: User
}
