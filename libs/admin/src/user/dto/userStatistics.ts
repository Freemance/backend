import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UsersStatistics {
  @Field()
  totalUsers: number
  @Field()
  usersApproved: number
  @Field()
  usersPending: number
}
