import { Test, TestingModule } from '@nestjs/testing'
import { JobService } from './job.service'

import { DataService } from '@feature/core'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'

const jobArray = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Journalist',
    company: 'Company One',
    description: 'Best job ever',
    startDate: new Date(),
    endDate: new Date(),
    inProgress: true,
    profileId: 1,
  },
  {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Journalist 1',
    company: 'Company Two',
    description: 'Best job ever 1',
    startDate: new Date(),
    endDate: new Date(),
    inProgress: true,
    profileId: 1,
  },
  {
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Journalist 2',
    company: 'Company Three',
    description: 'Best job ever 2',
    startDate: new Date(),
    endDate: new Date(),
    inProgress: true,
    profileId: 1,
  },
]

const secondJob = jobArray[1]

const profileId = 1
const jobId = 1

const db = {
  job: {
    findUnique: jest.fn().mockResolvedValue(secondJob),
    findMany: jest.fn().mockResolvedValue(jobArray),
    update: jest.fn().mockResolvedValue(secondJob),
    create: jest.fn().mockResolvedValue(secondJob),
    delete: jest.fn().mockResolvedValue(secondJob),
  },
}

describe('JobService', () => {
  let service: JobService
  let prisma: DataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<JobService>(JobService)
    prisma = module.get<DataService>(DataService)
  })

  describe('getAllProfileJobs', () => {
    it('should return a jobs array ', async () => {
      const jobs = await service.getAllProfileJobs(profileId)
      expect(jobs).toEqual(jobArray)
    })
  })

  describe('GetProfileJobById', () => {
    it('should get a job', () => {
      expect(service.getProfileJobById(jobId, profileId)).resolves.toEqual(secondJob)
    })

    it('should return NotFoundException', () => {
      jest.spyOn(prisma.job, 'findUnique').mockResolvedValue(undefined)
      expect(service.getProfileJobById(8, profileId)).rejects.toThrow(NotFoundException)
    })

    it('should return UnauthorizedException', () => {
      jest.spyOn(prisma.job, 'findUnique').mockResolvedValue({ ...secondJob, profileId: 1 })
      expect(service.getProfileJobById(jobId, profileId)).rejects.toThrow(UnauthorizedException)
    })
  })
  describe('CreateProfileJob', () => {
    it('should successfully insert a job', () => {
      expect(service.createProfileJob(profileId, { ...secondJob })).resolves.toEqual(secondJob)
    })
  })
  describe('UpdateProfileJob', () => {
    it('should call the update method', async () => {
      jest.spyOn(prisma.job, 'findUnique').mockResolvedValue({ ...secondJob, createdAt: null, updatedAt: null })
      const job = await service.updateProfileJob(jobId, profileId, { ...secondJob })
      expect(job).toEqual(secondJob)
    })

    it('should return NotFoundException', async () => {
      jest.spyOn(prisma.job, 'findUnique').mockResolvedValue(undefined)
      await expect(service.updateProfileJob(jobId, profileId, { ...secondJob })).rejects.toThrow(NotFoundException)
    })
  })
  describe('DeleteProfileJob', () => {
    it('should return true', () => {
      jest.spyOn(prisma.job, 'findUnique').mockResolvedValue({ ...secondJob, createdAt: null, updatedAt: null })
      expect(service.deleteProfileJob(jobId, profileId)).resolves.toEqual(true)
    })

    it('should return Error', () => {
      jest.spyOn(prisma.job, 'delete').mockRejectedValueOnce(new Error('Wrong Delete Method.'))
      expect(service.deleteProfileJob(jobId, profileId)).rejects.toEqual(Error('Wrong Delete Method.'))
    })
  })
})
