import { ObjectType } from '@nestjs/graphql'
import { Paginated } from '@feature/core'
import { User } from '@feature/auth'

@ObjectType()
export class UserConnection extends Paginated(User) {}
