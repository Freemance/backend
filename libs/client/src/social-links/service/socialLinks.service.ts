import { Injectable, NotFoundException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateSocialLinkInput } from '../dto/create-socialLinks.input'
import { UpdateSocialLinkInput } from '../dto/update-socialLinks.input'

@Injectable()
export class SocialLinksService {
  constructor(private readonly data: DataService) {}

  private readonly includes = { profile: true }

  async createSocialLink(input: CreateSocialLinkInput) {
    return this.data.socialLink.create({
      data: {
        ...input,
      },
    })
  }

  async getAllSocialLink() {
    return this.data.socialLink.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async getSocialLinkById(id: number) {
    const found = await this.data.socialLink.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`SocialLink with id: ${id} not found`)
    }
    return found
  }

  async updateSocialLink(id: number, input: UpdateSocialLinkInput) {
    const found = await this.getSocialLinkById(id)
    return this.data.socialLink.update({ where: { id: found.id }, data: { ...input } })
  }

  async deleteSocialLink(id: number) {
    const found = await this.getSocialLinkById(id)
    const deleted = this.data.socialLink.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
