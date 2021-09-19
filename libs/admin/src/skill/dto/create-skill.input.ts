import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateSkillInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field(() => [String], { description: 'Skill icon paths', nullable: true })
  icon: [string]
}
