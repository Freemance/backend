import { Test, TestingModule } from '@nestjs/testing'
import { TagService } from './tag.service'
import { DataService } from '@feature/core'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

const tagName = 'Java'
const tagId = 1

const tagArray = [
  { id: tagId, name: tagName },
  { id: 2, name: 'C++' },
  { id: 3, name: 'Nestjs' },
]
const tagArrayConnection = {
  edges: [
    { cursor: tagId, node: { id: tagId, name: tagName } },
    { cursor: 2, node: { id: 2, name: 'C++' } },
    { cursor: 3, node: { id: 3, name: 'Nestjs' } },
  ],
  pageInfo: { endCursor: 3, hasNextPage: false, hasPreviousPage: false, startCursor: 1 },
  totalCount: 3,
}

const oneTag = tagArray[0]

const db = {
  tag: {
    findMany: jest.fn().mockResolvedValue(tagArray),
    findUnique: jest.fn().mockResolvedValue(oneTag),
    findFirst: jest.fn().mockResolvedValue(oneTag),
    create: jest.fn().mockReturnValue(oneTag),
    count: jest.fn().mockReturnValue(tagArray.length),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneTag),
    delete: jest.fn().mockResolvedValue(oneTag),
  },
}

describe('TagService', () => {
  let service: TagService
  let prisma: DataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<TagService>(TagService)
    prisma = module.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('filterTags', () => {
    it('should return an tag Connection', async () => {
      const cats = await service.filter(null, null, null, null, '', null)
      expect(cats).toEqual(tagArrayConnection)
    })
  })

  describe('getTagById', () => {
    it('should get a single tag', () => {
      expect(service.getTagById(tagId)).resolves.toEqual(oneTag)
    })
    it('should return NotFoundException', () => {
      const dbSpy = jest.spyOn(prisma.tag, 'findUnique').mockReturnValue(undefined)
      expect(service.getTagById(5)).rejects.toThrow(NotFoundException)
    })
  })

  describe('create Tag', () => {
    it('should successfully insert a tag', () => {
      expect(
        service.createTag({
          name: tagName,
        }),
      ).resolves.toEqual(oneTag)
    })
    it('should return ConflictException', () => {
      const dbSpy = jest
        .spyOn(prisma.tag, 'create')
        .mockRejectedValue(new Prisma.PrismaClientKnownRequestError('', 'P2002', '', ''))
      expect(
        service.createTag({
          name: tagName,
        }),
      ).rejects.toThrow(ConflictException)
    })
  })

  describe('update Tag', () => {
    it('should call the update method', async () => {
      const dbSpy = jest
        .spyOn(prisma.tag, 'findUnique')
        .mockResolvedValue({ ...oneTag, createdAt: null, updatedAt: null })
      const tag = await service.updateTag(tagId, {
        name: tagName,
      })
      expect(tag).toEqual(oneTag)
    })
    it('should return NotFoundException', async () => {
      const dbSpy = jest.spyOn(prisma.tag, 'findUnique').mockResolvedValue(undefined)
      await expect(
        service.updateTag(tagId, {
          name: tagName,
        }),
      ).rejects.toThrow(NotFoundException)
    })
  })
  describe('deleteTag', () => {
    it('should return true', () => {
      const dbSpy = jest
        .spyOn(prisma.tag, 'findUnique')
        .mockResolvedValue({ ...oneTag, createdAt: null, updatedAt: null })
      expect(service.deleteTag(tagId)).resolves.toEqual(true)
    })

    it('should return {deleted: false, message: err.message}', () => {
      const dbSpy = jest.spyOn(prisma.tag, 'delete').mockRejectedValueOnce(new Error('Bad Delete Method.'))
      expect(service.deleteTag(tagId)).rejects.toEqual(Error('Bad Delete Method.'))
    })
  })
})
