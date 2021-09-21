import { DataService } from '@feature/core'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PortfolioService } from './portfolio.service'

const skills = [
  { id: 1, createdAt: new Date(), updatedAt: new Date(), name: 'Programming', icon: ['1', '2'] },
  { id: 2, createdAt: new Date(), updatedAt: new Date(), name: 'Writing', icon: ['1', '2'] },
  { id: 3, createdAt: new Date(), updatedAt: new Date(), name: 'Speaking', icon: ['1', '2'] },
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

const secondPortfolio = portfolioArray[1]

const profileId = 1
const portfolioId = 1

const db = {
  portfolio: {
    findUnique: jest.fn().mockResolvedValue(secondPortfolio),
    findMany: jest.fn().mockResolvedValue(portfolioArray),
    update: jest.fn().mockResolvedValue(secondPortfolio),
    create: jest.fn().mockResolvedValue(secondPortfolio),
    delete: jest.fn().mockResolvedValue(secondPortfolio),
  },
}

describe('PortfolioService', () => {
  let service: PortfolioService
  let prisma: DataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<PortfolioService>(PortfolioService)
    prisma = module.get<DataService>(DataService)
  })

  describe('getProfilePortfolioItems', () => {
    it('should return a portfolios array ', async () => {
      const portfolios = await service.getProfilePortfolioItems(profileId)
      expect(portfolios).toEqual(portfolioArray)
    })
  })

  describe('getProfilePortfolioById', () => {
    it('should get a portfolio', () => {
      expect(service.getProfilePortfolioById(portfolioId, profileId)).resolves.toEqual(secondPortfolio)
    })

    it('should return NotFoundException', () => {
      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValue(undefined)
      expect(service.getProfilePortfolioById(8, profileId)).rejects.toThrow(NotFoundException)
    })

    it('should return UnauthorizedException', () => {
      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValue({ ...secondPortfolio, profileId: 2 })
      expect(service.getProfilePortfolioById(portfolioId, profileId)).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('CreateProfilePortfolio', () => {
    it('should successfully insert a portfolio', () => {
      expect(service.createProfilePortfolio(profileId, { ...secondPortfolio })).resolves.toEqual(secondPortfolio)
    })
  })

  describe('UpdateProfilePortfolio', () => {
    it('should call the update method', async () => {
      jest
        .spyOn(prisma.portfolio, 'findUnique')
        .mockResolvedValue({ ...secondPortfolio, createdAt: null, updatedAt: null })
      const portfolio = await service.updateProfilePortfolio(portfolioId, profileId, { ...secondPortfolio })
      expect(portfolio).toEqual(secondPortfolio)
    })

    it('should return NotFoundException', async () => {
      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValue(undefined)
      await expect(service.updateProfilePortfolio(portfolioId, profileId, { ...secondPortfolio })).rejects.toThrow(
        NotFoundException,
      )
    })
  })

  describe('DeleteProfilePortfolio', () => {
    it('should return true', () => {
      jest
        .spyOn(prisma.portfolio, 'findUnique')
        .mockResolvedValue({ ...secondPortfolio, createdAt: null, updatedAt: null })
      expect(service.deleteProfilePortfolio(portfolioId, profileId)).resolves.toEqual(true)
    })

    it('should return Error', () => {
      jest.spyOn(prisma.portfolio, 'delete').mockRejectedValueOnce(new Error('Wrong Delete Method.'))
      expect(service.deleteProfilePortfolio(portfolioId, profileId)).rejects.toEqual(Error('Wrong Delete Method.'))
    })
  })
})
