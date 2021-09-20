import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { DataService } from '@feature/core'
import { UpdatePortfolioInput } from '../dto/update-portfolio.input'
import { CreatePortfolioInput } from '../dto/create-portfolio.input'
import { MultimediaService } from '@feature/client/multimedia'
import { FileUpload } from 'graphql-upload'

@Injectable()
export class PortfolioService {
  constructor(private readonly _service: DataService, private readonly _multimediaService: MultimediaService) {}

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

  async createProfilePortfolio(profileId: number, input: CreatePortfolioInput, files: [FileUpload]) {
    let screenshts: Array<string> = []
    if (files && files.length > 0) {
      const multimedias = await this._multimediaService.saveMultimedias(profileId, files)
      screenshts = [...multimedias.map((m) => m.filename)]
    }

    return this._service.portfolio.create({
      data: {
        ...input,
        screenshts: screenshts,
        profile: {
          connect: { id: profileId },
        },
      },
    })
  }

  async updateProfilePortfolio(id: number, profileId: number, input: UpdatePortfolioInput, files: [FileUpload]) {
    const found = await this.getProfilePortfolioById(id, profileId)
    let screenshts: Array<string> = found.screenshts
    if (files && files.length > 0) {
      const multimedias = await this._multimediaService.saveMultimedias(profileId, files)
      screenshts = [...screenshts, ...multimedias.map((m) => m.filename)]
    }
    return this._service.portfolio.update({
      where: { id: found.id },
      data: { ...input, screenshts: screenshts },
    })
  }

  async addPortfolioSkill(id: number, profileId: number, skillId: number) {
    const found = await this.getProfilePortfolioById(id, profileId)
    const foundSkill = await this._service.skill.findUnique({ where: { id: skillId } })
    if (!foundSkill) {
      throw new NotFoundException(`Skill with id: ${skillId} not found`)
    }
    return this._service.portfolio.update({
      where: { id: found.id },
      data: {
        skills: { connect: { id: foundSkill.id } },
      },
    })
  }
  async removeProfilePortfolioScreenshot(id: number, profileId: number, filename: string) {
    const { id: foundId, screenshts } = await this.getProfilePortfolioById(id, profileId)
    if (screenshts.includes(filename)) {
      const { filename: foundFilename, extension } = await this._multimediaService.getMultimediaByFilename(filename)
      try {
        await this._multimediaService.deleteFilesInServer(foundFilename, extension)
      } catch (e) {
        console.log(e)
      }
      screenshts.splice(screenshts.indexOf(filename), 1)
      return this._service.portfolio.update({ where: { id: foundId }, data: { screenshts } })
    } else {
      throw new NotFoundException(`Screenshot: ${filename} not exist on Portfolio with id: ${id}`)
    }
  }

  async removePortfolioSkill(id: number, profileId: number, skillId: number) {
    const found = await this.getProfilePortfolioById(id, profileId)
    const foundSkill = await this._service.skill.findUnique({ where: { id: skillId } })
    if (!found) {
      throw new NotFoundException(`Skill with id: ${skillId} not found`)
    }
    return this._service.portfolio.update({
      where: { id: found.id },
      data: {
        skills: { disconnect: { id: foundSkill.id } },
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
