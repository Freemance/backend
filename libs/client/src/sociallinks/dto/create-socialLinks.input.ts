import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateSocialLinkInput {
  @Field({ description: 'Linkendin link', nullable: true })
  @IsString()
  @MaxLength(150)
  @IsOptional()
  linkedin?: string

  @Field({ description: 'Instagram link', nullable: true })
  @IsString()
  @MaxLength(150)
  @IsOptional()
  instagram?: string

  @Field({ description: 'Facebook link', nullable: true })
  @IsString()
  @MaxLength(150)
  @IsOptional()
  facebook?: string

  @Field({ description: 'Telegram link', nullable: true })
  @IsString()
  @MaxLength(150)
  @IsOptional()
  telegram?: string
}
