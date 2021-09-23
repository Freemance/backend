import { ProfileStatus } from '.prisma/client'
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

describe('ProfileService', () => {
  let service: ProfileService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService],
    }).compile()

    service = module.get<ProfileService>(ProfileService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
