import { Injectable, NotFoundException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateSocialLinkInput, UpdateSocialLinkInput } from '..'

@Injectable()
export class SocialLinksService {
  constructor(private readonly data: DataService) {}

  private readonly includes = {}

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
    const found = await this.data.socialLink.findUnique({ where: { id } })
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
