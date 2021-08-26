import { BaseModel } from '@feature/core'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class SocialLink extends BaseModel {
  @Field({ description: 'Linkendin link', nullable: true })
  linkedin?: string

  @Field({ description: 'Instagram link', nullable: true })
  instagram?: string

  @Field({ description: 'Facebook link', nullable: true })
  facebook?: string

  @Field({ description: 'Telegram link', nullable: true })
  telegram?: string
}
