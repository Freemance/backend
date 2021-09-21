import { Test, TestingModule } from '@nestjs/testing'
import { MultimediaService } from './multimedia.service'

const multimedia = [
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

describe('MultimediaService', () => {
  let service: MultimediaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultimediaService],
    }).compile()

    service = module.get<MultimediaService>(MultimediaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
