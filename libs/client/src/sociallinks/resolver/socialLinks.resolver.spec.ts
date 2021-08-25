import { Test, TestingModule } from '@nestjs/testing'
import { SocialLinksResolver } from './socialLinks.resolver'
import { SocialLinksService } from './sociallinks.service'

describe('SocialLinksResolver', () => {
  let resolver: SocialLinksResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialLinksResolver, SocialLinksService],
    }).compile()

    resolver = module.get<SocialLinksResolver>(SocialLinksResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
