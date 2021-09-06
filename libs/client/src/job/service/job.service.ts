import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { CreateJobInput } from '../dto/create-job.input'
import { UpdateJobInput } from '../dto/update-job.input'
import { DataService } from '@feature/core'

@Injectable()
export class JobService {
  constructor(private readonly _service: DataService) {}

  public async getAllProfileJobs(profileId: number) {
    return this._service.job.findMany({ where: { profileId }, orderBy: { id: 'asc' } })
  }

  public async getProfileJobById(id: number, profileId: number) {
    const found = await this._service.job.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Job with id: ${id} not found`)
    }
    if (found.profileId !== profileId) {
      throw new UnauthorizedException()
    }
    return found
  }

  public createProfileJob(profileId: number, input: CreateJobInput) {
    const inProgress = !input.endDate ? true : false
    return this._service.job.create({
      data: {
        ...input,
        inProgress: inProgress,
        profile: {
          connect: { id: profileId },
        },
      },
    })
  }

  public async updateProfileJob(id: number, profileId: number, input: UpdateJobInput) {
    const found = await this.getProfileJobById(id, profileId)
    const inProgress = !input.endDate && !found.endDate && input.endDate === null ? true : false

    return this._service.job.update({ where: { id: found.id }, data: { ...input, inProgress: inProgress } })
  }

  public async deleteProfileJob(id: number, profileId: number) {
    const found = await this.getProfileJobById(id, profileId)
    const deleted = await this._service.job.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
