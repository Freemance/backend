import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLanguageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
