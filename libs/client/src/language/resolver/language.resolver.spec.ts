import { Test, TestingModule } from '@nestjs/testing'
import { LanguageService } from '../service/language.service'
import { LanguageResolver } from './language.resolver'

describe('LanguageResolver', () => {
  let resolver: LanguageResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguageResolver, LanguageService],
    }).compile()

    resolver = module.get<LanguageResolver>(LanguageResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
