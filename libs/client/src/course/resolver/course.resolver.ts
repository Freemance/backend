import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Course, CourseService, CreateCourseInput, UpdateCourseInput } from '..'

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly service: CourseService) {}

  @Mutation(() => Course)
  createCourse(@Args('input') input: CreateCourseInput) {
    return this.service.createCourse(input)
  }

  @Query(() => [Course], { name: 'courses' })
  getAllCourse() {
    return this.service.getAllCourse()
  }

  @Query(() => Course, { name: 'course' })
  getCourseById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getCourseById(id)
  }

  @Mutation(() => Course)
  updateCourse(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateCourseInput) {
    return this.service.updateCourse(id, input)
  }

  @Mutation(() => Boolean)
  deleteCourse(@Args('id', { type: () => Int }) id: number) {
    return this.service.deleteCourse(id)
  }
}
