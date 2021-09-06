import { ObjectType, Field } from '@nestjs/graphql'

import { BaseModel } from '@feature/core'

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

  @Field({ description: 'Twitter link', nullable: true })
  twitter?: string

  @Field({ description: 'Whatsapp link', nullable: true })
  whatsapp?: string

  @Field({ description: 'GooglePlus link', nullable: true })
  googlePlus?: string

  @Field({ description: 'Slack link', nullable: true })
  slack?: string

  @Field({ description: 'github link', nullable: true })
  github?: string

  @Field({ description: 'Youtube link', nullable: true })
  youtube?: string

  @Field({ description: 'Behance link', nullable: true })
  behance?: string

  @Field({ description: 'Dribble link', nullable: true })
  dribbble?: string
}
