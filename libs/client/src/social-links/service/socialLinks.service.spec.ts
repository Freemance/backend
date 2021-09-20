import { Test, TestingModule } from '@nestjs/testing'
import { SocialLinksService } from './socialLinks.service'
import { DataService } from '@feature/core'
import { NotFoundException } from '@nestjs/common'

const testTwitter1 = 'https://twitter.com/test1'
const testFacebook1 = 'https://facebook.com/test1'
const testYouTube1 = 'https://www.youtube.com/test1'
const profileId = 1

const sLinkArray = [
  {
    id: 1,
    twitter: testTwitter1,
    instagram: null,
    linkedin: null,
    facebook: testFacebook1,
    telegram: null,
    whatsapp: null,
    googlePlus: null,
    slack: null,
    github: null,
    youtube: testYouTube1,
    behance: null,
    dribbble: null,
    profileId: profileId,
  },
  {
    id: 2,
    twitter: testTwitter1,
    instagram: null,
    linkedin: null,
    facebook: testFacebook1,
    telegram: null,
    whatsapp: null,
    googlePlus: null,
    slack: null,
    github: null,
    youtube: testYouTube1,
    behance: null,
    dribbble: null,
    profileId: 2,
  },
  {
    id: 3,
    twitter: testTwitter1,
    instagram: null,
    linkedin: null,
    facebook: testFacebook1,
    telegram: null,
    whatsapp: null,
    googlePlus: null,
    slack: null,
    github: null,
    youtube: testYouTube1,
    behance: null,
    dribbble: null,
    profileId: 3,
  },
]

const oneSLink = sLinkArray[0]

const db = {
  socialLink: {
    findFirst: jest.fn().mockResolvedValue(oneSLink),
    update: jest.fn().mockResolvedValue(oneSLink),
  },
}

describe('SocialLinksService', () => {
  let service: SocialLinksService
  let prisma: DataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialLinksService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<SocialLinksService>(SocialLinksService)
    prisma = module.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getProfileSLinkById', () => {
    it('should get a single socialLink', async () => {
      expect(service.getProfileSLinkById(profileId)).resolves.toEqual(oneSLink)
    })

    it('should return NotFoundException', () => {
      jest.spyOn(prisma.socialLink, 'findFirst').mockReturnValue(undefined)
      expect(service.getProfileSLinkById(5)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update socialLink', () => {
    it('it should call the update method', async () => {
      jest.spyOn(prisma.socialLink, 'findFirst').mockResolvedValue({ ...oneSLink, createdAt: null, updatedAt: null })
      const slink = await service.updateProfileSLink(profileId, {
        facebook: testFacebook1,
        youtube: testYouTube1,
      })
      expect(slink).toEqual(oneSLink)
    })

    it('should return NotFoundException', async () => {
      jest.spyOn(prisma.socialLink, 'findFirst').mockResolvedValue(undefined)
      await expect(
        service.updateProfileSLink(profileId, { facebook: testFacebook1, youtube: testYouTube1 }),
      ).rejects.toThrow(NotFoundException)
    })
  })
})
