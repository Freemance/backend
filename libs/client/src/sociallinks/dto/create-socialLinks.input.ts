import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateSociallinkInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
