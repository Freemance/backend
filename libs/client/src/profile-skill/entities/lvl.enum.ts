import { registerEnumType } from '@nestjs/graphql'

export enum LVL {
  NOVICE,
  BEGINER,
  SKILLFULL,
  EXPERIENCED,
  EXPERT,
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
