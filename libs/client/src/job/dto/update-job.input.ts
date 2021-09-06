import { CreateJobInput } from './create-job.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateJobInput extends PartialType(CreateJobInput) {}
