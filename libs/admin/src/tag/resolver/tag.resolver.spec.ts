import { Test, TestingModule } from '@nestjs/testing'
import { TagResolver } from './tag.resolver'
import { TagService } from '../service/tag.service'
import { CreateTagInput } from '@feature/admin'
import { TagOrderField } from '@feature/admin/tag/dto/tag-order.input'
import { OrderDirection } from '@feature/core/data/common/order/order-direction'

const tagId = 1
const tagName = 'Java Developer'

const tagArrayConnection = {
  edges: [
    { cursor: tagId, node: { id: tagId, name: tagName } },
    { cursor: 2, node: { id: 2, name: 'Full Stack Developer' } },
    { cursor: 3, node: { id: 3, name: 'Front-end Developer' } },
  ],
  pageInfo: { endCursor: 3, hasNextPage: false, hasPreviousPage: false, startCursor: tagId },
  totalCount: 3,
}
describe('TagResolver', () => {
  let resolver: TagResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagResolver,
        {
          provide: TagService,
          // using a factory
          useFactory: () => ({
            filter: jest.fn(
              async (after: number, before: number, first: number, last: number, query: string, orderBy: any) =>
                tagArrayConnection,
            ),
            getTagById: jest.fn((id: number) => ({
              name: 'Programmer',
              id: id,
            })),
            createTag: jest.fn((input: CreateTagInput) => ({
              id: 10,
              ...input,
            })),
          }),
        },
      ],
    }).compile()

    resolver = module.get<TagResolver>(TagResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('filter', () => {
    it('should get the tagConnections', async () => {
      await expect(
        resolver.filterTags({ first: null, after: null, before: null, last: null }, '', {
          field: TagOrderField.id,
          direction: OrderDirection.asc,
        }),
      ).resolves.toBe(tagArrayConnection)
    })
  })

  describe('getTagById', () => {
    it('should get one tag', () => {
      expect(resolver.getTagById(tagId)).toEqual({
        id: tagId,
        name: 'Programmer',
      })
    })
  })

  describe('createTag', () => {
    it('should make a new tag', () => {
      expect(
        resolver.createTag({
          name: tagName,
        }),
      ).toEqual({
        id: 10,
        name: tagName,
      })
    })
  })
})
