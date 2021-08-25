import { CreateSociallinkInput } from './create-socialLinks.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSociallinkInput extends PartialType(CreateSociallinkInput) {
  @Field(() => Int)
  id: number
}
