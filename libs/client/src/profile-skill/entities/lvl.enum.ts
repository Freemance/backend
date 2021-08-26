import { registerEnumType } from '@nestjs/graphql'

export enum LVL {
  NOVICE = 'NOVICE',
  BEGINER = 'BEGINER',
  SKILLFULL = 'SKILLFULL',
  EXPERIENCED = 'EXPERIENCED',
  EXPERT = 'EXPERT',
}

registerEnumType(LVL, {
  name: 'LEVEL',
  description: 'The supported profile-skill level',
  valuesMap: {
    NOVICE: {
      description: 'The default profile-skill level',
    },
  },
})
