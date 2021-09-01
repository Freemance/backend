import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateLanguageInput } from '../dto/create-language.input'
import { UpdateLanguageInput } from '../dto/update-language.input'

@Injectable()
export class LanguageService {
  constructor(private readonly _service: DataService) {}

  async getAllProfileLangs(profileId: number) {
    return this._service.language.findMany({ where: { profileId }, orderBy: { id: 'asc' } })
  }

  async getProfileLangById(id: number, profileId: number) {
    const found = await this._service.language.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Language with id: ${id} not found`)
    }
    if (found.profileId !== profileId) {
      throw new UnauthorizedException()
    }
    return found
  }

  async createProfileLang(profileId: number, input: CreateLanguageInput) {
    return this._service.language.create({
      data: {
        ...input,
        profile: {
          connect: { id: profileId },
        },
      },
    })
  }

  async updateProfileLang(id: number, profileId: number, input: UpdateLanguageInput) {
    const found = await this.getProfileLangById(id, profileId)
    return this._service.language.update({ where: { id: found.id }, data: { ...input } })
  }

  async deleteProfileLang(id: number, profileId: number) {
    const found = await this.getProfileLangById(id, profileId)
    const deleted = this._service.language.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
