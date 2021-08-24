import { Field, ObjectType, Int, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType()
export class Skill {
  @Field(() => Int, { description: 'Skill id', nullable: true })
  id?: number

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date

  @Field({ description: 'Skill name', nullable: true })
  name?: string

  @Field(() => [Profile], { description: 'Profiles asociated to Skill', nullable: 'items' })
  profiles?: Profile[]

  @Field({ description: 'Portfolio id asociated to Skill', nullable: true })
  portfolio?: Portfolio
}
