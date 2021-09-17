import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { DataService, findManyCursorConnection } from '@feature/core'

import { CreateSkillInput } from '../dto/create-skill.input'
import { UpdateSkillInput } from '../dto/update-skill.input'
import { Prisma } from '@prisma/client'
import { FileUpload } from 'graphql-upload'
import { MultimediaService } from '@feature/client/multimedia'

@Injectable()
export class SkillService {
  constructor(private readonly _service: DataService, private readonly _multimediaService: MultimediaService) {}
  private readonly includes = { profiles: true }

  async filter(after, before, first, last, query, orderBy) {
    const a = await findManyCursorConnection(
      (args) =>
        this._service.skill.findMany({
          where: {
            name: { contains: query || '', mode: 'insensitive' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this._service.skill.count({
          where: {
            name: { contains: query || '', mode: 'insensitive' },
          },
        }),
      { first, last, before, after },
    )
    return a
  }

  public async getSkillById(id: number) {
    const found = await this._service.skill.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Skill with id: ${id} not found`)
    }
    return found
  }

  public async createSkill(createBy: number, input: CreateSkillInput, file: FileUpload) {
    let icon = ''
    if (file) {
      const { filename } = await this._multimediaService.saveMultimedia(createBy, file, ['image/svg+xml'])
      icon = filename
    }
    try {
      const skill = await this._service.skill.create({
        data: {
          ...input,
          icon: icon,
        },
      })
      return skill
    } catch (e) {
      if (icon !== '') {
        try {
          await this._multimediaService.deleteMultimediaByUser(createBy, icon)
        } catch (em) {
          console.log(em)
        }
      }
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Skill ${input.name} already used.`)
      } else {
        throw new Error(e)
      }
    }
  }

  public async updateSkill(createBy: number, id: number, input: UpdateSkillInput, file: FileUpload) {
    const found = await this.getSkillById(id)

    let icon = found.icon
    if (file) {
      const { filename } = await this._multimediaService.saveMultimedia(createBy, file, ['image/svg+xml'])
      icon = filename
      if (found.icon !== null) {
        try {
          await this._multimediaService.deleteMultimediaByUser(createBy, found.icon)
        } catch (em) {
          console.log(em)
        }
      }
    }

    return this._service.skill.update({ where: { id: found.id }, data: { ...input, icon: icon } })
  }

  public async deleteSkill(createBy: number, id: number) {
    const found = await this.getSkillById(id)
    const icon = found.icon
    const deleted = await this._service.skill.delete({
      where: {
        id: found.id,
      },
    })
    if (deleted) {
      await this._multimediaService.deleteMultimediaByUser(createBy, found.icon)
    }
    return !!deleted
  }
}
