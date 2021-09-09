import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class PasswordResets {
  @Field()
  email: string

  @Field()
  token: string

  @Field(() => Date, {
    description: 'Identifies the expire date token',
  })
  timestamp: Date
}
