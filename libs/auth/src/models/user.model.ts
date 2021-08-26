import { BaseModel } from '@feature/core/data/common'
import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
})

@ObjectType()
export class User extends BaseModel {
  email: string
  firstname?: string
  lastname?: string
  role: Role
  @HideField()
  password: string
}
