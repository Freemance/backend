import { Injectable, NotFoundException } from '@nestjs/common'
import { DataService } from '@feature/core'
import { UpdatePortfolioInput } from '../dto/update-portfolio.input'
import { CreatePortfolioInput } from '../dto/create-portfolio.input'

@Injectable()
export class PortfolioService {
  constructor(private readonly _service: DataService) {}

  private readonly includes = { profile: true, skills: true }

  createPortfolio(input: CreatePortfolioInput) {
    return this._service.portfolio.create({
      data: {
        ...input,
      },
    })
  }

  async getAllPortfolio() {
    return this._service.portfolio.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async getPortfolioById(id: number) {
    const found = await this._service.portfolio.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`Portfolio with id: ${id} not found`)
    }
    return found
  }

  async updatePortfolio(id: number, input: UpdatePortfolioInput) {
    const found = await this.getPortfolioById(id)
    return this._service.portfolio.update({ where: { id: found.id }, data: { ...input } })
  }

  async deletePortfolio(id: number) {
    const found = await this.getPortfolioById(id)
    const deleted = await this._service.portfolio.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
