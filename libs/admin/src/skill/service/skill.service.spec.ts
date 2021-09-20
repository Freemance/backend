import { Test, TestingModule } from '@nestjs/testing'
import { SkillService } from './skill.service'
import { DataService } from '@feature/core'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

const skillName = 'Java'
const skillId = 1
const icon: [string] = ['M454-']

const skillArray = [
  { id: skillId, name: skillName, icon: icon },
  { id: 2, name: 'c++', icon: [] },
  { id: 3, name: 'c#', icon: [] },
]
const skillArrayConnection = {
  edges: [
    { cursor: skillId, node: { id: skillId, name: skillName, icon: icon } },
    { cursor: 2, node: { id: 2, name: 'c++', icon: [] } },
    { cursor: 3, node: { id: 3, name: 'c#', icon: [] } },
  ],
  pageInfo: { endCursor: 3, hasNextPage: false, hasPreviousPage: false, startCursor: skillId },
  totalCount: 3,
}

const oneSkill = skillArray[0]

const db = {
  skill: {
    findMany: jest.fn().mockResolvedValue(skillArray),
    findUnique: jest.fn().mockResolvedValue(oneSkill),
    findFirst: jest.fn().mockResolvedValue(oneSkill),
    create: jest.fn().mockReturnValue(oneSkill),
    count: jest.fn().mockReturnValue(skillArray.length),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneSkill),
    delete: jest.fn().mockResolvedValue(oneSkill),
  },
}

describe('SkillService', () => {
  let service: SkillService
  let prisma: DataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<SkillService>(SkillService)
    prisma = module.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('filterSkills', () => {
    it('should return an skill Connection', async () => {
      const skills = await service.filter(null, null, null, null, '', null)
      expect(skills).toEqual(skillArrayConnection)
    })
  })

  describe('getSkillById', () => {
    it('should get a single tag', () => {
      expect(service.getSkillById(skillId)).resolves.toEqual(oneSkill)
    })
    it('should return NotFoundException', () => {
      const dbSpy = jest.spyOn(prisma.skill, 'findUnique').mockReturnValue(undefined)
      expect(service.getSkillById(skillId)).rejects.toThrow(NotFoundException)
    })
  })

  describe('create Skill', () => {
    it('should successfully insert a skill', () => {
      expect(
        service.createSkill({
          name: skillName,
          icon: icon,
        }),
      ).resolves.toEqual(oneSkill)
    })
    it('should return ConflictException', () => {
      const dbSpy = jest
        .spyOn(prisma.skill, 'create')
        .mockRejectedValue(new Prisma.PrismaClientKnownRequestError('', 'P2002', '', ''))
      expect(
        service.createSkill({
          name: skillName,
          icon: icon,
        }),
      ).rejects.toThrow(ConflictException)
    })
  })

  describe('update Skill', () => {
    it('should call the update method', async () => {
      const dbSpy = jest
        .spyOn(prisma.skill, 'findUnique')
        .mockResolvedValue({ ...oneSkill, createdAt: null, updatedAt: null })
      const tag = await service.updateSkill(skillId, {
        name: skillName,
        icon: icon,
      })
      expect(tag).toEqual(oneSkill)
    })
    it('should return NotFoundException', async () => {
      const dbSpy = jest.spyOn(prisma.skill, 'findUnique').mockResolvedValue(undefined)
      await expect(
        service.updateSkill(skillId, {
          name: skillName,
          icon: icon,
        }),
      ).rejects.toThrow(NotFoundException)
    })
  })
  describe('deleteSkill', () => {
    it('should return true', () => {
      const dbSpy = jest
        .spyOn(prisma.skill, 'findUnique')
        .mockResolvedValue({ ...oneSkill, createdAt: null, updatedAt: null })
      expect(service.deleteSkill(skillId)).resolves.toEqual(true)
    })

    it('should return Error', () => {
      const dbSpy = jest.spyOn(prisma.skill, 'delete').mockRejectedValueOnce(new Error('Bad Delete Method.'))
      expect(service.deleteSkill(skillId)).rejects.toEqual(Error('Bad Delete Method.'))
    })
  })
})
