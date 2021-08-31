import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UsersStatistics {
  @Field()
  totalUsers: number
  @Field()
  usersAproved: number
  @Field()
  usersPending: number
}
