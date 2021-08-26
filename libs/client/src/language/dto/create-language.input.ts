import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { LANLVL } from '../entities/lanLvl.enum'

@InputType()
export class CreateLanguageInput {
  @Field({ description: 'Language name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  language: string

  @Field(() => LANLVL, { description: 'Language lvl asociated to Language', defaultValue: LANLVL.NATIVE_SPEAKER })
  @IsNotEmpty()
  lvl: LANLVL
}
