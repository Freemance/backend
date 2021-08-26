import { InputType, Int, Field } from '@nestjs/graphql'
import { SocialLink } from '..'

@InputType()
export class CreateSociallinkInput extends SocialLink {}
