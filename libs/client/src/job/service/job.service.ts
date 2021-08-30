import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateJobInput } from '../dto/create-job.input'
import { UpdateJobInput } from '../dto/update-job.input'
import { DataService } from '@feature/core'

@Injectable()
export class JobService {
  constructor(private readonly _service: DataService) {}
  private readonly includes = { profile: true }

  public createJob(input: CreateJobInput) {
    return this._service.job.create({
      data: {
        ...input,
      },
    })
  }

  public async getAllJob() {
    return this._service.job.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  public async getJobById(id: number) {
    const found = await this._service.job.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Job with id: ${id} not found`)
    }
    return found
  }

  public async updateJob(id: number, input: UpdateJobInput) {
    const found = await this.getJobById(id)

    return this._service.job.update({ where: { id: found.id }, data: { ...input } })
  }

  public async deleteJob(id: number) {
    const found = await this.getJobById(id)
    const deleted = this._service.job.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
