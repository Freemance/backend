import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
@InputType()
export class UpdateUserInput {
  @Field({ description: 'User firstname' })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @Field({ description: 'User lastName' })
  @IsNotEmpty()
  @IsString()
  lastName: string
}
