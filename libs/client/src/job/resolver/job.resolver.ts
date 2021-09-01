import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { GqlAuthGuard, Role, Roles, RolesGuard, User, UserEntity } from '@feature/auth'
import { CreateJobInput } from '../dto/create-job.input'
import { UpdateJobInput } from '../dto/update-job.input'
import { Job } from '../entities/job.entity'
import { JobService } from '../service/job.service'
import { UseGuards } from '@nestjs/common'

@UseGuards(GqlAuthGuard)
@UseGuards(RolesGuard)
@Roles(Role.USER)
@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly _service: JobService) {}

  @Query(() => [Job], { name: 'ProfileJobs', nullable: 'items' })
  getAllProfileJobs(@UserEntity() user: User) {
    return this._service.getAllProfileJobs(user.profile.id)
  }

  @Query(() => Job, { name: 'ProfileJobById', nullable: true })
  getProfileJobById(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.getProfileJobById(id, user.profile.id)
  }

  @Mutation(() => Job, { name: 'ProfileCreateJob', nullable: true })
  createProfileJob(@UserEntity() user: User, @Args('createJobInput') input: CreateJobInput) {
    return this._service.createProfileJob(user.profile.id, input)
  }

  @Mutation(() => Job, { name: 'ProfileUpdateJob', nullable: true })
  updateProfileJob(
    @UserEntity() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateJobInput,
  ) {
    return this._service.updateProfileJob(id, user.profile.id, input)
  }

  @Mutation(() => Job, { name: 'ProfileDeleteJob', nullable: true })
  deleteProfileJob(@UserEntity() user: User, @Args('id', { type: () => Int }) id: number) {
    return this._service.deleteProfileJob(id, user.profile.id)
  }
}
