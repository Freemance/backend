import { InputType, PartialType } from '@nestjs/graphql'
import { CreateProfileSkillInput } from './create-profile-skill.input'

@InputType()
export class UpdateProfileSkillInput extends PartialType(CreateProfileSkillInput) {}
