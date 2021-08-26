import { InputType, PartialType } from '@nestjs/graphql'
import { CreateSocialLinkInput } from '..'

@InputType()
export class UpdateSocialLinkInput extends PartialType(CreateSocialLinkInput) {}
