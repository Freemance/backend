import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Order } from '@feature/core'

export enum TagOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
}

registerEnumType(TagOrderField, {
  name: 'TagOrderField',
  description: 'Properties by which tags connections can be ordered.',
})

@InputType()
export class TagOrder extends Order {
  @Field(() => TagOrderField)
  field: TagOrderField
}
