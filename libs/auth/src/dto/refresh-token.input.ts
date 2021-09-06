import { ArgsType, Field } from '@nestjs/graphql'
import { IsJWT, IsNotEmpty } from 'class-validator'

@ArgsType()
export class RefreshTokenInput {
  @Field()
  @IsNotEmpty()
  @IsJWT()
  token: string
}
