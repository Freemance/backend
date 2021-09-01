import { Injectable, NotFoundException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateSocialLinkInput } from '../dto/create-socialLinks.input'
import { UpdateSocialLinkInput } from '../dto/update-socialLinks.input'

@Injectable()
export class SocialLinksService {
  constructor(private readonly _service: DataService) {}

  private readonly includes = { profile: true }

  async createSocialLink(input: CreateSocialLinkInput) {
    return this._service.socialLink.create({
      data: {
        ...input,
      },
    })
  }

  async getAllSocialLink() {
    return this._service.socialLink.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async getSocialLinkById(id: number) {
    const found = await this._service.socialLink.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`SocialLink with id: ${id} not found`)
    }
    return found
  }

  async updateSocialLink(id: number, input: UpdateSocialLinkInput) {
    const found = await this.getSocialLinkById(id)
    return this._service.socialLink.update({ where: { id: found.id }, data: { ...input } })
  }

  async deleteSocialLink(id: number) {
    const found = await this.getSocialLinkById(id)
    const deleted = await this._service.socialLink.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
