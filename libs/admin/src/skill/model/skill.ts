import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class Skill {
  @Field((type) => Int, { description: 'Skill id' })
  id: number

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date

  @Field({ description: 'Skill name' })
  name: string

  @Field((type) => [Profile], { nullable: 'items' })
  profiles: Profile[]
}
