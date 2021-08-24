import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class Skill {
  @Field((type) => Int, { description: 'Skill id', nullable: true })
  id?: number

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ description: 'Skill name', nullable: true })
  name?: string

  @Field((type) => [Profile], { description: 'Profiles asociated to Skill', nullable: 'items' })
  profiles?: Profile[]

  @Field({ description: 'Portfolio id asociated to Skill', nullable: true })
  portfolio?: Portfolio
}
