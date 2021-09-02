import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateMultimediaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
