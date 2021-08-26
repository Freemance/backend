import { InputType, PartialType } from '@nestjs/graphql'
import { CreateSociallinkInput } from '..'

@InputType()
export class UpdateSociallinkInput extends PartialType(CreateSociallinkInput) {}
