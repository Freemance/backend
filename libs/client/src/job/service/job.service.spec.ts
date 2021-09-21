import { Test, TestingModule } from '@nestjs/testing'
import { JobService } from './job.service'

import { DataService } from '@feature/core'

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

const db = {
  language: {
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

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('GetAllProfileLangs', () => {
    it('should return a languages array ', async () => {
      const jobs = await service.getAllProfileJobs(profileId)
      expect(jobs).toEqual(jobArray)
    })
  })
})
