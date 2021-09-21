import { DataService } from '@feature/core'
import { NotFoundException } from '@nestjs/common'
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

const multimediaId = 1
const profileId = 1

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
      providers: [
        MultimediaService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<MultimediaService>(MultimediaService)
    prisma = module.get<DataService>(DataService)
  })

  describe('getAllMultimedias', () => {
    it('should return a multimedias array ', async () => {
      const multimedia = await service.getAllMultimedias()
      expect(multimedia).toEqual(multimediaArray)
    })
  })

  describe('getMultimediaById', () => {
    it('should get a multimedia', () => {
      expect(service.getMultimediaById(multimediaId)).resolves.toEqual(secondMultimedia)
    })

    it('should return NotFoundException', () => {
      jest.spyOn(prisma.multimedia, 'findUnique').mockResolvedValue(undefined)
      expect(service.getMultimediaById(8)).rejects.toThrow(NotFoundException)
    })
  })

  describe('getMultimediaByFilename', () => {
    it('should get a multimedia', () => {
      expect(service.getMultimediaByFilename('My photo 2')).resolves.toEqual(secondMultimedia)
    })

    it('should return NotFoundException', () => {
      jest.spyOn(prisma.multimedia, 'findUnique').mockResolvedValue(undefined)
      expect(service.getMultimediaByFilename('My photo 8')).rejects.toThrow(NotFoundException)
    })
  })

  describe('CreateProfileMultimedia', () => {
    it('should successfully insert a multimedia', () => {
      expect(service.createMultimedia(profileId, { ...secondMultimedia })).resolves.toEqual(secondMultimedia)
    })
  })

  describe('DeleteProfileMultimedia', () => {
    it('should return true', () => {
      jest
        .spyOn(prisma.multimedia, 'findUnique')
        .mockResolvedValue({ ...secondMultimedia, createdAt: null, updatedAt: null })
      expect(service.deleteMultimediaByUser(profileId, 'My photo 1')).resolves.toEqual(true)
    })
  })
})
