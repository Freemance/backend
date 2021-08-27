import { ObjectType, Field } from '@nestjs/graphql'

import { LVL } from './lvl.enum'
import { Skill } from '@feature/admin'
import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'

@ObjectType()
export class ProfileSkill extends BaseModel {
  @Field(() => LVL, { description: 'skill lvl asociated to profileSkill', defaultValue: 'NOVICE' })
  level: LVL

  @Field(() => Skill, { description: 'Skill asociated to profileSkill' })
  skill?: Skill

  @Field(() => Profile, { description: 'Profile asociated to profileSkill' })
  profile?: Profile
}
