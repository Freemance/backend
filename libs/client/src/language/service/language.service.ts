import { Injectable, NotFoundException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateLanguageInput } from '../dto/create-language.input'
import { UpdateLanguageInput } from '../dto/update-language.input'

@Injectable()
export class LanguageService {
  constructor(private readonly data: DataService) {}
  private readonly includes = {}

  async createLanguage(input: CreateLanguageInput) {
    return this.data.language.create({
      data: {
        ...input,
      },
    })
  }

  async getAllLanguage() {
    return this.data.language.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async getLanguageById(id: number) {
    const found = await this.data.language.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Language with id: ${id} not found`)
    }
    return found
  }

  async updateLanguage(id: number, input: UpdateLanguageInput) {
    const found = await this.getLanguageById(id)
    return this.data.language.update({ where: { id: found.id }, data: { ...input } })
  }

  async deleteLanguage(id: number) {
    const found = await this.getLanguageById(id)
    const deleted = this.data.language.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
