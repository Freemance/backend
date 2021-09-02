import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Multimedia {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  created_by: number
}
// created_by
// file_name
// file_path
// file_size
// file_type
// file_extension
// file_height
// status
