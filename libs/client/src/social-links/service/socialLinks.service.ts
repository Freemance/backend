import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { UpdateSocialLinkInput } from '../dto/update-socialLinks.input'

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

  async updateProfileSLink(id: number, profileId: number, input: UpdateSocialLinkInput) {
    const found = await this.getProfileSLinkById(id, profileId)

    return this._service.socialLink.update({ where: { id: found.id }, data: { ...input } })
  }
}
