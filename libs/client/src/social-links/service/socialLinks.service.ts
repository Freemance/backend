import { Injectable, NotFoundException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { UpdateSocialLinkInput } from '../dto/update-socialLinks.input'

@Injectable()
export class SocialLinksService {
  constructor(private readonly _service: DataService) {}

  async getProfileSLinkById(profileId: number) {
    const found = await this._service.socialLink.findFirst({
      where: {
        profile: {
          id: profileId,
        },
      },
    })
    if (!found) {
      throw new NotFoundException(`SocialLink with id: ${profileId} not found`)
    }

    return found
  }

  async updateProfileSLink(profileId: number, input: UpdateSocialLinkInput) {
    const found = await this.getProfileSLinkById(profileId)

    return this._service.socialLink.update({ where: { id: found.id }, data: { ...input } })
  }
}
