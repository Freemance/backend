import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Order } from '@feature/core'

export enum UserOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  username = 'username',
  email = 'email',
  state = 'state',
}

registerEnumType(UserOrderField, {
  name: 'UserOrderField',
  description: 'Properties by which users connections can be ordered.',
})

@InputType()
export class UserOrder extends Order {
  @Field(() => UserOrderField)
  field: UserOrderField
}
