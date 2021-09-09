import { IsJWT, IsNotEmpty, MinLength } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class resetPasswordInput {
  @Field()
  @IsNotEmpty()
  @IsJWT()
  token: string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
