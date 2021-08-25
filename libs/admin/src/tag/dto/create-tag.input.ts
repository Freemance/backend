import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty,   IsString } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field(() => String, { description: 'Tag (placeholder)' })
  @IsNotEmpty()
  @IsString()
  name: String;
}
