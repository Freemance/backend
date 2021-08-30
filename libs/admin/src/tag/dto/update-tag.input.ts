import { CreateTagInput } from '..'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(100)
  name: string
}
