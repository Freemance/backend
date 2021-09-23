import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { CreateCourseInput } from './../dto/create-course.input'
import { CourseOrder } from './../dto/course-order.input'
import { Course } from '../entities/course.entity'
import { CourseConnection } from '../entities/course-connection.model'
import { CourseService } from '../service/course.service'
import { UpdateCourseInput } from '../dto/update-course.input'
import { PaginationArgs } from '@feature/core'

@UseGuards(GqlAuthGuard, RolesGuard)
@Roles(Role.USER)
@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly _service: CourseService) {}

  @Query(() => CourseConnection)
  async profileCourses(
    @UserEntity() user: User,
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => CourseOrder,
      nullable: true,
    })
    orderBy: CourseOrder,
  ) {
    return this._service.filter(user.profile.id, after, before, first, last, query, orderBy)
  }

  @Query(() => [Course], { name: 'profileCourses', nullable: 'items' })
  getAllProfileCourses(@UserEntity() user: User) {
    return this._service.getAllProfileCourses(user.profile.id)
  }

  @Query(() => Course, { name: 'profileCourseById', nullable: true })
  getProfileCourseById(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.getProfileCourseById(id, user.profile.id)
  }

  @Mutation(() => Course, { name: 'profileCreateCourse', nullable: true })
  createProfileCourse(@UserEntity() user: User, @Args('input') input: CreateCourseInput) {
    return this._service.createProfileCourse(user.profile.id, input)
  }

  @Mutation(() => Course, { name: 'profileUpdateCourse', nullable: true })
  updateProfileCourse(
    @UserEntity() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateCourseInput,
  ) {
    return this._service.updateProfileCourse(id, user.profile.id, input)
  }

  @Mutation(() => Boolean, { name: 'profileDeleteCourse', nullable: true })
  deleteProfileCourse(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.deleteProfileCourse(id, user.profile.id)
  }
}
