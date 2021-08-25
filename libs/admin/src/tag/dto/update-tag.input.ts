import { CreateTagInput } from './create-tag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(100)
  name: String;
}
