import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'User firstname' })
  @IsNotEmpty()
  @IsString()
  firstname: string

  @Field(() => String, { description: 'User lastName' })
  @IsNotEmpty()
  @IsString()
  lastname: string
}
