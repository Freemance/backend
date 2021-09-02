import { ObjectType } from '@nestjs/graphql'
import { Paginated } from '@feature/core'
import { Tag } from './tag.entity'

@ObjectType()
export class TagConnection extends Paginated(Tag) {}
