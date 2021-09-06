import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Order } from '@feature/core'

export enum ProfileOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  slykUser = 'slykUser',
  jobTitle = 'jobTitle',
  bio = 'bio',
  country = 'country',
  city = 'city',
  address = 'address',
  postalCode = 'postalCode',
  placeOfBirth = 'placeOfBirth',
  phone = 'phone',
}

registerEnumType(ProfileOrderField, {
  name: 'ProfileOrderField',
  description: 'Properties by which users connections can be ordered.',
})

@InputType()
export class ProfileOrder extends Order {
  @Field(() => ProfileOrderField)
  field: ProfileOrderField
}
