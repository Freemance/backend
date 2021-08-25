import { ObjectType, Field } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'

@ObjectType()
export class Job extends BaseModel {
  @Field({ description: 'Job name' })
  name: string

  @Field(() => [Profile], { description: 'Profiles asociated to Jobs', nullable: 'items' })
  profiles: Profile[]
}
