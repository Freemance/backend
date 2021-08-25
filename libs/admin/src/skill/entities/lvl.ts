import { registerEnumType } from '@nestjs/graphql'

export enum LVL {
  NOVICE,
  BEGINER,
  SKILLFULL,
  EXPERIENCED,
  EXPERT,
}

registerEnumType(LVL, {
  name: 'LVL',
  description: 'The supported skills levels',
  valuesMap: {
    NOVICE: {
      description: 'The default skills level',
    },
  },
})
