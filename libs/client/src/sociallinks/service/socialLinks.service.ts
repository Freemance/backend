import { Injectable } from '@nestjs/common'
import { CreateSociallinkInput, UpdateSociallinkInput } from '..'

@Injectable()
export class SocialLinksService {
  create(createSociallinkInput: CreateSociallinkInput) {
    return 'This action adds a new SocialLink'
  }

  findAll() {
    return `This action returns all sociallinks`
  }

  findOne(id: number) {
    return `This action returns a #${id} SocialLink`
  }

  update(id: number, updateSociallinkInput: UpdateSociallinkInput) {
    return `This action updates a #${id} SocialLink`
  }

  remove(id: number) {
    return `This action removes a #${id} SocialLink`
  }
}
