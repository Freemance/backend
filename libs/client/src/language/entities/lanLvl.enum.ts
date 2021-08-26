import { registerEnumType } from '@nestjs/graphql'

export enum LANLVL {
  NATIVE_SPEAKER = 'NATIVE_SPEAKER',
  HIGHLY_PROFICIENT = 'HIGHLY_PROFICIENT',
  VERY_GOOD_COMMAND = 'VERY_GOOD_COMMAND',
  GOOD_WORKING_KNOWLEDGE = 'GOOD_WORKING_KNOWLEDGE',
  WORKING_KNOWLEDGE = 'WORKING_KNOWLEDGE',
  C1 = 'C1',
  C2 = 'C2',
  B1 = 'B1',
  B2 = 'B2',
  A1 = 'A1',
  A2 = 'A2',
}

registerEnumType(LANLVL, {
  name: 'LANLVL',
  description: 'The supported language levels',
  valuesMap: {
    NATIVE_SPEAKER: {
      description: 'The default language level',
    },
  },
})
