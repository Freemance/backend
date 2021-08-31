import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  skip?: number
  @Field((type) => Int, { nullable: true })
  after?: number
  @Field((type) => Int, { nullable: true })
  before?: number
  @Field((type) => Int, { nullable: true })
  first?: number
  @Field((type) => Int, { nullable: true })
  last?: number
}
