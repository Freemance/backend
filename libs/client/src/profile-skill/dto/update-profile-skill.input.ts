import { InputType, PartialType } from '@nestjs/graphql'
import { CreateProfileSkillInput } from '..'

@InputType()
export class UpdateProfileSkillInput extends PartialType(CreateProfileSkillInput) {}
