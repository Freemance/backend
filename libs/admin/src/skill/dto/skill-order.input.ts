import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Order } from '@feature/core'

export enum SkillOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'firstName',
}

registerEnumType(SkillOrderField, {
  name: 'SkillOrderField',
  description: 'Properties by which skills connections can be ordered.',
})

@InputType()
export class SkillOrder extends Order {
  @Field(() => SkillOrderField)
  field: SkillOrderField
}
