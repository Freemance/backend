import { Test, TestingModule } from '@nestjs/testing'
import { MultimediaResolver } from './multimedia.resolver'
import { MultimediaService } from '../multimedia.service'

describe('MultimediaResolver', () => {
  let resolver: MultimediaResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultimediaResolver, MultimediaService],
    }).compile()

    resolver = module.get<MultimediaResolver>(MultimediaResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
