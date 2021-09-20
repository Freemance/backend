import { Test, TestingModule } from '@nestjs/testing'
import { SkillResolver } from './skill.resolver'
import { SkillService } from '../service/skill.service'
import { CreateSkillInput } from '@feature/admin'
import { SkillOrderField } from '@feature/admin/skill/dto/skill-order.input'
import { OrderDirection } from '@feature/core/data/common/order/order-direction'

const skillName = 'Java'
const skillId = 1
const icon: [string] = ['M454-']

const skillArrayConnection = {
  edges: [
    { cursor: skillId, node: { id: skillId, name: skillName, icon: icon } },
    { cursor: 2, node: { id: 2, name: 'c++', icon: [] } },
    { cursor: 3, node: { id: 3, name: 'c#', icon: [] } },
  ],
  pageInfo: { endCursor: 3, hasNextPage: false, hasPreviousPage: false, startCursor: skillId },
  totalCount: 3,
}

describe('SkillResolver', () => {
  let resolver: SkillResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillResolver,
        {
          provide: SkillService,
          // using a factory
          useFactory: () => ({
            filter: jest.fn(
              async (after: number, before: number, first: number, last: number, query: string, orderBy: any) =>
                skillArrayConnection,
            ),
            getSkillById: jest.fn((id: number) => ({
              name: 'c++',
              id: id,
              icon: [],
            })),
            createSkill: jest.fn((input: CreateSkillInput) => ({
              id: 10,
              ...input,
            })),
          }),
        },
      ],
    }).compile()
    resolver = module.get<SkillResolver>(SkillResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('filter', () => {
    it('should get the skillConnections', async () => {
      await expect(
        resolver.filterSkills({ first: null, after: null, before: null, last: null }, '', {
          field: SkillOrderField.id,
          direction: OrderDirection.asc,
        }),
      ).resolves.toBe(skillArrayConnection)
    })
  })

  describe('getSkillById', () => {
    it('should get one skill', () => {
      expect(resolver.getSkillById(skillId)).toEqual({
        id: skillId,
        name: 'c++',
        icon: [],
      })
    })
  })

  describe('createSkill', () => {
    it('should make a new skill', () => {
      expect(
        resolver.createSkill({
          name: skillName,
          icon: icon,
        }),
      ).toEqual({
        id: 10,
        name: skillName,
        icon: icon,
      })
    })
  })
})
