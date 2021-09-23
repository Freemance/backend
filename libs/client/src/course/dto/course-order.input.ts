import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Order } from '@feature/core'

export enum CourseOrderField {
  id = 'id',
  course = 'course',
  institution = 'institution',
  description = 'description',
  startDate = 'startDate',
  endDate = 'endDate',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(CourseOrderField, {
  name: 'CourseOrderField',
  description: 'Properties by which courses connections can be ordered.',
})

@InputType()
export class CourseOrder extends Order {
  @Field(() => CourseOrderField)
  field: CourseOrderField
}
