import { ObjectType, Field } from '@nestjs/graphql'
import { BaseModel } from '@feature/core'
import { Profile } from '@feature/client'

@ObjectType()
export class Tag extends BaseModel {
  @Field({ description: 'Tag name' })
  name: string

  @Field(() => [Profile], { description: 'Profiles asociated to Tags', nullable: 'items' })
  profiles: Profile[]
}
