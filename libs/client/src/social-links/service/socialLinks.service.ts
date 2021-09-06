import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateSocialLinkInput } from '../dto/create-socialLinks.input'
import { UpdateSocialLinkInput } from '../dto/update-socialLinks.input'
import { exists } from 'fs'

@Injectable()
export class SocialLinksService {
  constructor(private readonly _service: DataService) {}

  async getProfileSLinkById(id: number, profileId: number) {
    const found = await this._service.socialLink.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`SocialLink with id: ${id} not found`)
    }
    if (found.profileId !== profileId) {
      throw new UnauthorizedException()
    }
    return found
  }

  async createProfileSLink(profileId: number, input: CreateSocialLinkInput) {
    return this._service.socialLink.create({
      data: {
        ...input,
        profile: {
          connect: { id: profileId },
        },
      },
    })
  }

  async updateProfileSLink(id: number, profileId: number, input: UpdateSocialLinkInput) {
    const found = await this.getProfileSLinkById(id, profileId)

    return this._service.socialLink.update({ where: { id: found.id }, data: { ...input } })
  }

  async deleteProfileSLink(id: number, profileId: number) {
    const found = await this.getProfileSLinkById(id, profileId)
    const deleted = await this._service.socialLink.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
