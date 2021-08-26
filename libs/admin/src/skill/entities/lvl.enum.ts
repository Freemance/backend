import { registerEnumType } from '@nestjs/graphql'

export enum LVL {
  NOVICE = 'NOVICE',
  BEGINER = 'BEGINER',
  SKILLFULL = 'SKILLFULL',
  EXPERIENCED = 'EXPERIENCED',
  EXPERT = 'EXPERT',
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
