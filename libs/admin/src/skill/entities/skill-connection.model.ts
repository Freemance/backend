import { ObjectType } from '@nestjs/graphql'
import { Paginated } from '@feature/core'
import { Skill } from './skill.entity'

@ObjectType()
export class SkillConnection extends Paginated(Skill) {}
