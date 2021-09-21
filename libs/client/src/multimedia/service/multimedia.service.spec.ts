import { DataService } from '@feature/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MultimediaService } from './multimedia.service'

const multimediaArray = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 4,
    filename: 'My photo',
    path: '/thispath',
    size: '740X560',
    type: 'image/png',
    extension: 'png',
    status: false,
  },
  {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 8,
    filename: 'My photo 1',
    path: '/thispath',
    size: '740X560',
    type: 'image/png',
    extension: 'png',
    status: false,
  },
  {
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 6,
    filename: 'My photo 2',
    path: '/thispath',
    size: '740X560',
    type: 'image/png',
    extension: 'png',
    status: true,
  },
]

const secondMultimedia = multimediaArray[1]

const profileId = 1
const multimediaId = 1

const db = {
  multimedia: {
    findUnique: jest.fn().mockResolvedValue(secondMultimedia),
    findMany: jest.fn().mockResolvedValue(multimediaArray),
    update: jest.fn().mockResolvedValue(secondMultimedia),
    create: jest.fn().mockResolvedValue(secondMultimedia),
    delete: jest.fn().mockResolvedValue(secondMultimedia),
  },
}

describe('MultimediaService', () => {
  let service: MultimediaService
  let prisma: DataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultimediaService],
    }).compile()

    service = module.get<MultimediaService>(MultimediaService)
    prisma = module.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
