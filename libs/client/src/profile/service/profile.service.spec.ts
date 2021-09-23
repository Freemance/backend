import { ProfileStatus } from '.prisma/client'
import { EmailService } from '@feature/auth'
import { MultimediaService } from '@feature/client/multimedia'
import { DataService } from '@feature/core'
import { Test, TestingModule } from '@nestjs/testing'
import { ProfileService } from './profile.service'

const profileArray = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    slykUser: 'Slyker One',
    firstName: 'My first name',
    lastName: 'My last name',
    profileStatus: ProfileStatus.APPROVED,
    avatar: 'My avatar',
    jobTitle: 'My job title',
    bio: 'My bio',
    country: 'Not Cuba please',
    city: 'My city',
    address: 'My address',
    postalCode: 'My postal code',
    placeOfBirth: 'Someother that Cuba',
    dateOfBirth: new Date(),
    phone: '5665134982',
  },
  {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    slykUser: 'Slyker Two',
    firstName: 'My first name',
    lastName: 'My last name',
    profileStatus: ProfileStatus.APPROVED,
    avatar: 'My avatar',
    jobTitle: 'My job title',
    bio: 'My bio',
    country: 'Not Cuba please',
    city: 'My city',
    address: 'My address',
    postalCode: 'My postal code',
    placeOfBirth: 'Someother that Cuba',
    dateOfBirth: new Date(),
    phone: '462384168',
  },
  {
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    slykUser: 'Slyker Three',
    firstName: 'My first name',
    lastName: 'My last name',
    profileStatus: ProfileStatus.APPROVED,
    avatar: 'My avatar',
    jobTitle: 'My job title',
    bio: 'My bio',
    country: 'Not Cuba please',
    city: 'My city',
    address: 'My address',
    postalCode: 'My postal code',
    placeOfBirth: 'Someother that Cuba',
    dateOfBirth: new Date(),
    phone: '593216523',
  },
]

const secondProfile = profileArray[1]

const profileId = 1

const db = {
  profile: {
    findUnique: jest.fn().mockResolvedValue(secondProfile),
    findMany: jest.fn().mockResolvedValue(profileArray),
    update: jest.fn().mockResolvedValue(secondProfile),
    create: jest.fn().mockResolvedValue(secondProfile),
    delete: jest.fn().mockResolvedValue(secondProfile),
  },
}

describe('ProfileService', () => {
  let service: ProfileService
  let prisma: DataService
  let multimedia: MultimediaService
  let email: EmailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<ProfileService>(ProfileService)
    prisma = module.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
