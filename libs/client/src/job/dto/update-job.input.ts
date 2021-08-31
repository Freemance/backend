import { CreateJobInput } from './create-job.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateJobInput extends PartialType(CreateJobInput) {
  @Field({ nullable: true })
  @IsString()
  name: string
}
