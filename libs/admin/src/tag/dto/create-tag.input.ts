import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateTagInput {
  @Field({ description: 'Tag' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string
}
