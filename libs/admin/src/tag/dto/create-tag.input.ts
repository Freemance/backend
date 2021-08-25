import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateTagInput {
  @Field(() => String, { description: 'Tag (placeholder)' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string
}
