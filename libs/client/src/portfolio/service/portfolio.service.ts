import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { UpdatePortfolioInput } from '../dto/update-portfolio.input'
import { CreatePortfolioInput } from '../dto/create-portfolio.input'

@Injectable()
export class PortfolioService {
  constructor(private readonly _service: DataService) {}

  async getProfilePortfolioItems(profileId: number) {
    return this._service.portfolio.findMany({ where: { profileId }, orderBy: { id: 'asc' } })
  }

  async getProfilePortfolioById(id: number, profileId: number) {
    const found = await this._service.portfolio.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Portfolio with id: ${id} not found`)
    }
    if (found.profileId !== profileId) {
      throw new UnauthorizedException()
    }
    return found
  }

  async createProfilePortfolio(profileId: number, input: CreatePortfolioInput) {
    return this._service.portfolio.create({
      data: {
        ...input,
        profile: {
          connect: { id: profileId },
        },
      },
    })
  }

  async updateProfilePortfolio(id: number, profileId: number, input: UpdatePortfolioInput) {
    const found = await this.getProfilePortfolioById(id, profileId)
    return this._service.portfolio.update({
      where: { id: found.id },
      data: { ...input },
    })
  }
  async addPortfolioSkill(id: number, profileId: number, skillId: number) {
    const found = await this.getProfilePortfolioById(id, profileId)
    return this._service.portfolio.update({
      where: { id: found.id },
      data: {
        skills: { connect: { id: skillId } },
      },
    })
  }

  async removePortfolioSkill(id: number, profileId: number, skillId: number) {
    const found = await this.getProfilePortfolioById(id, profileId)
    return this._service.portfolio.update({
      where: { id: found.id },
      data: {
        skills: { disconnect: { id: skillId } },
      },
    })
  }

  async deleteProfilePortfolio(id: number, profileId: number) {
    const found = await this.getProfilePortfolioById(id, profileId)
    const deleted = await this._service.portfolio.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
