import { InputType, PartialType } from '@nestjs/graphql'
import { CreateSocialLinkInput } from './create-socialLinks.input'

@InputType()
export class UpdateSocialLinkInput extends PartialType(CreateSocialLinkInput) {}
