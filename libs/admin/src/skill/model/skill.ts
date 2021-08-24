import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class Skill {
  @Field((type) => Int, { description: 'Skill id' })
  id: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field({ description: 'Skill name' })
  name: string

  @Field((type) => [Profile], { description: 'Profiles asociated to Skill', nullable: 'items' })
  profiles: Profile[]

  @Field((type) => Int, { description: 'Portfolio id asociated to Skill', nullable: true })
  portfolio?: number
}
