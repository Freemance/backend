import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { DataService, findManyCursorConnection } from '@feature/core'

import { CreateSkillInput } from '../dto/create-skill.input'
import { UpdateSkillInput } from '../dto/update-skill.input'
import { Prisma } from '@prisma/client'
import { FileUpload } from 'graphql-upload'

@Injectable()
export class SkillService {
  constructor(private readonly _service: DataService) {}
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

  public async createSkill(createBy: number, input: CreateSkillInput) {
    try {
      const skill = await this._service.skill.create({
        data: {
          ...input,
        },
      })
      return skill
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Skill ${input.name} already used.`)
      } else {
        throw new Error(e)
      }
    }
  }

  public async updateSkill(createBy: number, id: number, input: UpdateSkillInput) {
    const found = await this.getSkillById(id)
    return this._service.skill.update({ where: { id: found.id }, data: { ...input } })
  }

  public async deleteSkill(createBy: number, id: number) {
    const found = await this.getSkillById(id)
    const deleted = await this._service.skill.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
