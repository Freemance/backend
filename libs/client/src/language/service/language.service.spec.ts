import { LANLVL } from '@feature/client'
import { DataService } from '@feature/core'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LanguageService } from './language.service'

const langId = 1
const langName = 'Ingles'
const langLVL = LANLVL.NATIVE_SPEAKER
const profileId = 1

const languageArray = [
  { id: langId, language: langName, lvl: langLVL, createdAt: new Date(), updatedAt: new Date(), profileId: profileId },
  { id: 2, language: 'Espanol', lvl: LANLVL.C2, createdAt: new Date(), updatedAt: new Date(), profileId: profileId },
  { id: 3, language: 'Italiano', lvl: LANLVL.A2, createdAt: new Date(), updatedAt: new Date(), profileId: profileId },
]

const oneLanguage = languageArray[0]
const db = {
  language: {
    findMany: jest.fn().mockResolvedValue(languageArray),
    findUnique: jest.fn().mockResolvedValue(oneLanguage),
    update: jest.fn().mockResolvedValue(oneLanguage),
    create: jest.fn().mockResolvedValue(oneLanguage),
    delete: jest.fn().mockResolvedValue(oneLanguage),
  },
}
describe('LanguageService', () => {
  let service: LanguageService
  let prisma: DataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguageService,
        {
          provide: DataService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<LanguageService>(LanguageService)
    prisma = module.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('GetAllProfileLangs', () => {
    it('should return a languages array ', async () => {
      const languages = await service.getAllProfileLangs(profileId)
      expect(languages).toEqual(languageArray)
    })
  })
  describe('GetProfileLangById', () => {
    it('should get a language', () => {
      expect(service.getProfileLangById(langId, profileId)).resolves.toEqual(oneLanguage)
    })
    it('should return NotFoundException', () => {
      jest.spyOn(prisma.language, 'findUnique').mockResolvedValue(undefined)
      expect(service.getProfileLangById(5, profileId)).rejects.toThrow(NotFoundException)
    })
    it('should return UnauthorizedException', () => {
      jest.spyOn(prisma.language, 'findUnique').mockResolvedValue({ ...oneLanguage, profileId: 2 })
      expect(service.getProfileLangById(langId, profileId)).rejects.toThrow(UnauthorizedException)
    })
  })
  describe('CreateProfileLang', () => {
    it('should successfully insert a language', () => {
      expect(service.createProfileLang(profileId, { ...oneLanguage })).resolves.toEqual(oneLanguage)
    })
  })
  describe('UpdateProfileLang', () => {
    it('should call the update method', async () => {
      jest.spyOn(prisma.language, 'findUnique').mockResolvedValue({ ...oneLanguage, createdAt: null, updatedAt: null })
      const lang = await service.updateProfileLang(langId, profileId, { ...oneLanguage })
      expect(lang).toEqual(oneLanguage)
    })
    it('should return NotFoundException', async () => {
      jest.spyOn(prisma.language, 'findUnique').mockResolvedValue(undefined)
      await expect(service.updateProfileLang(langId, profileId, { ...oneLanguage })).rejects.toThrow(NotFoundException)
    })
  })
  describe('DeleteProfileLang', () => {
    it('should return true', () => {
      jest.spyOn(prisma.language, 'findUnique').mockResolvedValue({ ...oneLanguage, createdAt: null, updatedAt: null })
      expect(service.deleteProfileLang(langId, profileId)).resolves.toEqual(true)
    })

    it('should return Error', () => {
      jest.spyOn(prisma.language, 'delete').mockRejectedValueOnce(new Error('Bad Delete Method.'))
      expect(service.deleteProfileLang(langId, profileId)).rejects.toEqual(Error('Bad Delete Method.'))
    })
  })
})
