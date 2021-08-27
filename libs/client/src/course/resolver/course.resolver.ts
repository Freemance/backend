import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateCourseInput } from './../dto/create-course.input'
import { Course } from '../entities/course.entity'
import { CourseService } from '../service/course.service'
import { UpdateCourseInput } from '../dto/update-course.input'

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly service: CourseService) {}

  @Mutation(() => Course, { nullable: true })
  createCourse(@Args('input') input: CreateCourseInput) {
    return this.service.createCourse(input)
  }

  @Query(() => [Course], { name: 'courses', nullable: 'items' })
  getAllCourse() {
    return this.service.getAllCourse()
  }

  @Query(() => Course, { name: 'course', nullable: true })
  getCourseById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getCourseById(id)
  }

  @Mutation(() => Course, { nullable: true })
  updateCourse(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateCourseInput) {
    return this.service.updateCourse(id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  deleteCourse(@Args('id', { type: () => Int }) id: number) {
    return this.service.deleteCourse(id)
  }
}
