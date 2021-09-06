import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  skip?: number
  @Field(() => Int, { nullable: true })
  after?: number
  @Field(() => Int, { nullable: true })
  before?: number
  @Field(() => Int, { nullable: true })
  first?: number
  @Field(() => Int, { nullable: true })
  last?: number
}
