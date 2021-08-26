import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'

import { CreateJobInput } from '../dto/create-job.input'
import { UpdateJobInput } from '../dto/update-job.input'
import { Job } from '../entities/job.entity'
import { JobService } from '../service/job.service'

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly service: JobService) {}

  @Mutation(() => Job)
  createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this.service.createJob(createJobInput)
  }

  @Query(() => [Job], { name: 'job' })
  findAll() {
    return this.service.getAllJob()
  }

  @Query(() => Job, { name: 'job' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.getJobById(id)
  }

  @Mutation(() => Job)
  updateJob(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateJobInput) {
    return this.service.updateJob(id, input)
  }

  @Mutation(() => Job)
  deleteJob(@Args('id', { type: () => Int }) id: number) {
    return this.service.deleteJob(id)
  }
}
