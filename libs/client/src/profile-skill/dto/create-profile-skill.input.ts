import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { LVL } from '../entities/lvl.enum'

@InputType()
export class CreateProfileSkillInput {
  @Field(() => LVL, { description: 'Skill lvl asociated to profile', defaultValue: 'NOVICE' })
  @IsNotEmpty()
  level: LVL
}
