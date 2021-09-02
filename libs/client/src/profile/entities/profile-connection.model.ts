import { ObjectType } from '@nestjs/graphql'
import { Paginated } from '@feature/core'
import { Profile } from './profile.entity'

@ObjectType()
export class ProfileConnection extends Paginated(Profile) {}
