import { Field, ObjectType } from '@nestjs/graphql'
import { User, Token } from '..'

@ObjectType()
export class Auth extends Token {
  @Field(() => User, { description: 'user access' })
  user: User
}
