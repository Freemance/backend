import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.entity'
import { Token } from './token.model'

@ObjectType()
export class Auth extends Token {
  @Field(() => User, { description: 'user access' })
  user: User
}
