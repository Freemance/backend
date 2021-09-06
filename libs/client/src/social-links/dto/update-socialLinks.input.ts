import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdateSocialLinkInput {
  @Field({ description: 'Linkendin link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  linkedin?: string

  @Field({ description: 'Instagram link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  instagram?: string

  @Field({ description: 'Facebook link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  facebook?: string

  @Field({ description: 'Telegram link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  telegram?: string

  @Field({ description: 'Twitter link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  twitter?: string

  @Field({ description: 'Whatsapp link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  whatsapp?: string

  @Field({ description: 'GooglePlus link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  googlePlus?: string

  @Field({ description: 'Slack link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  slack?: string

  @Field({ description: 'github link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  github?: string

  @Field({ description: 'Youtube link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  youtube?: string

  @Field({ description: 'Behance link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  behance?: string

  @Field({ description: 'Dribble link', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  dribbble?: string
}
