import { InputType, Field } from '@nestjs/graphql'
import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdateBasicProfileInput {
  @Field({ description: 'JobTitle name', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  jobTitle?: string

  @Field({ description: 'Bio description', nullable: true })
  @IsString()
  @MaxLength(550)
  @IsOptional()
  bio?: string

  @Field({ description: 'Country name', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  country?: string

  @Field({ description: 'City name', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  city?: string

  @Field({ description: 'Address', nullable: true })
  @IsString()
  @MaxLength(550)
  @IsOptional()
  address?: string

  @Field({ description: 'PostalCode', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  postalCode?: string

  @Field({ description: 'Place of birth', nullable: true })
  @IsString()
  @MaxLength(350)
  @IsOptional()
  placeOfBirth?: string

  @Field(() => Date, { description: 'Date of birth', nullable: true })
  @IsDate()
  @IsOptional()
  dateOfBirth?: Date

  @Field({ description: 'Phone number', nullable: true })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  phone?: string
}
