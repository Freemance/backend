import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor?: string

  @Field(() => Boolean)
  hasNextPage: boolean

  @Field(() => Boolean)
  hasPreviousPage: boolean

  @Field({ nullable: true })
  startCursor?: string
}
