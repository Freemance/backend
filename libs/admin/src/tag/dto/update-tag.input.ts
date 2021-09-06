import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsString, MaxLength } from 'class-validator'
import { CreateTagInput } from './create-tag.input'

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(100)
  name: string
}
