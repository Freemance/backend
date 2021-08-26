import { Skill } from '@feature/admin'
import { BaseModel } from '@feature/core'
import { ObjectType, Field, Int } from '@nestjs/graphql'
import { LVL } from '..'
import { Profile } from '@feature/client'

@ObjectType()
export class ProfileSkill extends BaseModel {
  @Field(() => LVL, { description: 'skill lvl asociated to profileSkill', defaultValue: LVL.NOVICE })
  level: LVL

  @Field(() => Skill, { description: 'Skill asociated to profileSkill' })
  skill?: Skill

  @Field(() => Profile, { description: 'Profile asociated to profileSkill' })
  profile?: Profile
}
