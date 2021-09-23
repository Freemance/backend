import { ObjectType } from '@nestjs/graphql'
import { Paginated } from '@feature/core'
import { Course } from './course.entity'

@ObjectType()
export class CourseConnection extends Paginated(Course) {}
