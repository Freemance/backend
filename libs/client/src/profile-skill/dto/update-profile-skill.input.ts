import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { CreateProfileSkillInput } from '..'

@InputType()
export class UpdateProfileSkillInput extends PartialType(CreateProfileSkillInput) {
  @Field(() => Int)
  id: number
}
