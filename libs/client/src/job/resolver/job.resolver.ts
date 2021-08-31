import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateJobInput } from '../dto/create-job.input'
import { UpdateJobInput } from '../dto/update-job.input'
import { Job } from '../entities/job.entity'
import { JobService } from '../service/job.service'

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly _service: JobService) {}

  @Mutation(() => Job, { nullable: true })
  createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this._service.createJob(createJobInput)
  }

  @Query(() => [Job], { name: 'job', nullable: 'items' })
  findAll() {
    return this._service.getAllJob()
  }

  @Query(() => Job, { name: 'job', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this._service.getJobById(id)
  }

  @Mutation(() => Job, { nullable: true })
  updateJob(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateJobInput) {
    return this._service.updateJob(id, input)
  }

  @Mutation(() => Job, { nullable: true })
  deleteJob(@Args('id', { type: () => Int }) id: number) {
    return this._service.deleteJob(id)
  }
}
