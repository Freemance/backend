import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'User firstname' })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @Field(() => String, { description: 'User lastName' })
  @IsNotEmpty()
  @IsString()
  lastName: string
}
