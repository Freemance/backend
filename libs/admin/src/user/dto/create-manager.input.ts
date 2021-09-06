import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

@InputType()
export class CreateManagerInput {
  @Field({ description: 'Manager email' })
  @IsEmail()
  email: string

  @Field({ description: 'Manager password' })
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @Field({ description: 'Manager username' })
  @IsNotEmpty()
  @IsString()
  username: string
}
