import { Skill } from '.prisma/client'
import { Test, TestingModule } from '@nestjs/testing'
import { PortfolioService } from './portfolio.service'

const skills: Skill = [
  { id: 1, createdAt: new Date(), updatedAt: new Date(), name: 'Programming', icon: ['1', '2'] },
  { id: 1, createdAt: new Date(), updatedAt: new Date(), name: 'Writing', icon: ['1', '2'] },
  { id: 1, createdAt: new Date(), updatedAt: new Date(), name: 'Speaking', icon: ['1', '2'] },
]

const portfolioArray = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),

    proyect: 'First Proyect',
    link: 'https://firstproyect.com',
    description: 'First Proyect Description',
    screenshts: ['1', '2'],
    startDate: new Date(),
    endDate: new Date(),

    skills: skills,
    profileId: 1,
  },
  {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),

    proyect: 'Second Proyect',
    link: 'https://secondproyect.com',
    description: 'Second Proyect Description',
    screenshts: ['1', '2'],
    startDate: new Date(),
    endDate: new Date(),

    skills: skills,
    profileId: 1,
  },
  {
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),

    proyect: 'Third Proyect',
    link: 'https://thirdproyect.com',
    description: 'Third Proyect Description',
    screenshts: ['1', '2'],
    startDate: new Date(),
    endDate: new Date(),

    skills: skills,
    profileId: 1,
  },
]

describe('PortfolioService', () => {
  let service: PortfolioService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioService],
    }).compile()

    service = module.get<PortfolioService>(PortfolioService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
