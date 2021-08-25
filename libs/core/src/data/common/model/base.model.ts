import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: number
  @Field(() => GraphQLISODateTime, {
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: Date
  @Field(() => GraphQLISODateTime, {
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: Date
}
