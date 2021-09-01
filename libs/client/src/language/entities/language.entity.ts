import { ObjectType, Field } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'
import { LANLVL } from './lanLvl.enum'

@ObjectType()
export class Language extends BaseModel {
  @Field({ description: 'Language name' })
  language: string

  @Field(() => LANLVL, { description: 'Language lvl asociated to Language', defaultValue: LANLVL.NATIVE_SPEAKER })
  lvl: LANLVL
}
