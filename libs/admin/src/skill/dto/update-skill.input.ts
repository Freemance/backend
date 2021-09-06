import { Field, InputType, PartialType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { CreateSkillInput } from './create-skill.input'

@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {
  @Field({ nullable: true })
  @IsString()
  name: string
}
