import { Injectable, NotFoundException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { CreateProfileSkillInput } from '../dto/create-profile-skill.input'
import { UpdateProfileSkillInput } from '../dto/update-profile-skill.input'

@Injectable()
export class ProfileSkillService {
  constructor(private readonly _service: DataService) {}

  private readonly includes = { profile: true, skill: true }

  async createProfileSkill(input: CreateProfileSkillInput, profileId: number, skillId: number) {
    return this._service.profileSkill.create({
      data: {
        profileId,
        skillId,
        ...input,
      },
    })
  }

  async getAllProfileSkill() {
    return this._service.profileSkill.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async getProfileSkillById(id: number) {
    const found = await this._service.language.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Language with id: ${id} not found`)
    }
    return found
  }

  async updateProfileSkill(id: number, input: UpdateProfileSkillInput, profileId: number, skillId: number) {
    const found = await this.getProfileSkillById(id)
    return this._service.profileSkill.update({
      where: { id: found.id },
      data: { ...input, profileId, skillId },
    })
  }

  async deleteProfileSkill(id: number) {
    const found = await this.getProfileSkillById(id)
    const deleted = await this._service.profileSkill.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
