import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { LVL } from '..'
@InputType()
export class CreateProfileSkillInput {
  @Field(() => LVL, { description: 'Skill lvl asociated to profile', defaultValue: LVL.NOVICE })
  @IsNotEmpty()
  lvl: LVL
}
