import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'
import { Portfolio } from '@feature/client'

@ObjectType()
export class Tag extends BaseModel {
  @Field({ description: 'Tag name' })
  name: string

  @Field(() => [Profile], { description: 'Profiles asociated to Skill', nullable: 'items' })
  profiles: Profile[]
}
