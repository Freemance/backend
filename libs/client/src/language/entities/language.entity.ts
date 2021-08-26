import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Language {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
