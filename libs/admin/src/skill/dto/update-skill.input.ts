import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateSkillInput {
  @Field({ nullable: true })
  @IsString()
  name: string
}
