import { Test, TestingModule } from '@nestjs/testing'
import { SocialLinksService } from './socialLinks.service'
import { DataService } from '@feature/core'

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
  let data: DataService

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
    data = module.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getProfileSLinkById', () => {
    it('should get one SocialLink', async () => {
      expect(service.getProfileSLinkById(profileId)).resolves.toEqual(oneSLink)
    })
  })

  // describe('updateProfileSLink', () => {
  //   it('should call the update method', async () => {
  //     const sLink = await service.updateProfileSLink(profileId, {
  //       twitter: testTwitter1,
  //       instagram: null,
  //       linkedin: null,
  //       facebook: testFacebook1,
  //       telegram: null,
  //       whatsapp: null,
  //       googlePlus: null,
  //       slack: null,
  //       github: null,
  //       youtube: testYouTube1,
  //       behance: null,
  //       dribbble: null,
  //     })
  //     expect(service.getProfileSLinkById(profileId)).toHaveBeenCalledTimes(1)
  //     // expect(sLink).toEqual(oneSLink)
  //   })
  // })
})
