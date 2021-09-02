import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateMultimediaInput {
  @Field({ description: 'Name of the file', nullable: true })
  @IsString()
  @MaxLength(350)
  file_name?: string

  @Field({ description: 'Path of the file', nullable: true })
  @IsString()
  file_path?: string

  @Field({ description: 'Size of the file', nullable: true })
  @IsString()
  @MaxLength(50)
  file_size?: string

  @Field({ description: 'Type of the file', nullable: true })
  @IsString()
  @MaxLength(50)
  file_type?: string

  @Field({ description: 'Extension of the file', nullable: true })
  @IsString()
  @MaxLength(50)
  file_extension?: string

  @Field({ description: 'Height of the file', nullable: true })
  @IsString()
  @MaxLength(50)
  file_height?: string

  @Field({ description: 'Status of the file ' })
  @IsBoolean()
  status: boolean
}
