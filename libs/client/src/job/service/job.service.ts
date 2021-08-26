import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateJobInput } from '../dto/create-job.input'
import { UpdateJobInput } from '../dto/update-job.input'
import { DataService } from '@feature/core'

@Injectable()
export class JobService {
  constructor(private readonly data: DataService) {}
  private readonly includes = {}

  public createJob(input: CreateJobInput) {
    return this.data.job.create({
      data:{
        ...input,
      }
    })
  }

  public async getAllJob() {
    return this.data.job.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  public async getJobById(id: number) {
    const found = await this.data.job.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Job with id: ${id} not found`)
    }
    return found
  }

  public async updateJob(id: number, input: UpdateJobInput) {
    const found = await this.getJobById(id)

    return this.data.job.update({ where: { id: found.id }, data: { ...input } })
  }

  public async deleteJob(id: number) {
    const found = await this.getJobById(id)
    const deleted = this.data.job.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
