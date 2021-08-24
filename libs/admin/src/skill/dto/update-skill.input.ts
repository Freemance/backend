import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateSkillInput {
  @Field({ nullable: true })
  name: string
}
