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

  @Field({ description: 'Manager firstname' })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @Field({ description: 'Manager lastName' })
  @IsNotEmpty()
  @IsString()
  lastName: string
}
