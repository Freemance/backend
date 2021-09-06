import { registerEnumType } from '@nestjs/graphql'

export enum ProfileStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  NEEDFIX = 'NEEDFIX',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
}

registerEnumType(ProfileStatus, {
  name: 'ProfileStatus',
  description: 'Profile Status',
})
