import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateJobInput {
  @Field(() => String, { description: 'Job (placeholder)' })
  @IsNotEmpty()  
  @IsString()
  name: string
}
