import { Injectable } from '@nestjs/common'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'

@Injectable()
export class MultimediaService {
  create(input: CreateMultimediaInput) {
    return 'This action adds a new multimedia'
  }

  findAll() {
    return `This action returns all multimedia`
  }

  findOne(id: number) {
    return `This action returns a #${id} multimedia`
  }

  remove(id: number) {
    return `This action removes a #${id} multimedia`
  }
}
