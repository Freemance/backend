import { Injectable } from '@nestjs/common';
import { CreateJobInput } from '../dto/create-job.input';
import { UpdateJobInput } from '../dto/update-job.input';

@Injectable()
export class JobService {
  createJob(createJobInput: CreateJobInput) {
    return 'This action adds a new job';
  }

  getAllJob() {
    return `This action returns all job`;
  }

  findOneById(id: number) {
    return `This action returns a #${id} job`;
  }

  updateJob(id: number, updateJobInput: UpdateJobInput) {
    return `This action updates a #${id} job`;
  }

  deleteJob(id: number) {
    return `This action removes a #${id} job`;
  }
}
