import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateMultimediaInput {
  @Field({ description: 'Name of the file', nullable: true })
  @IsString()
  @MaxLength(350)
  filename: string

  @Field({ description: 'Path of the file', nullable: true })
  @IsString()
  path?: string

  @Field({ description: 'Size of the file', nullable: true })
  @IsString()
  @MaxLength(50)
  size?: string

  @Field({ description: 'Type of the file', nullable: true })
  @IsString()
  @MaxLength(50)
  type?: string

  @Field({ description: 'Extension of the file', nullable: true })
  @IsString()
  @MaxLength(50)
  extension?: string

  @Field({ description: 'Status of the file ' })
  @IsBoolean()
  status: boolean
}
