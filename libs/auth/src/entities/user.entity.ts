import { Profile } from '@feature/client'
import { BaseModel } from '@feature/core/data/common'
import { ObjectType, registerEnumType, HideField, Field } from '@nestjs/graphql'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
})

@ObjectType()
export class User extends BaseModel {
  @Field()
  email: string

  @Field()
  username: string

  @Field()
  active: boolean

  @Field()
  role: Role

  @Field(() => Profile, { description: 'user profile', nullable: true })
  profile?: Profile

  @HideField()
  password: string
}
