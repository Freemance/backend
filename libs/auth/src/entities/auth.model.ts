import { Field, ObjectType } from '@nestjs/graphql'
import { Token } from './token.model'
import { User } from './user.entity'

@ObjectType()
export class Auth extends Token {
  @Field(() => User, { description: 'user access' })
  user: User
}
