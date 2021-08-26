import { Injectable, NotFoundException } from '@nestjs/common'
import { DataService } from '@feature/core'
import { CreatePortfolioInput, UpdatePortfolioInput } from '..'

@Injectable()
export class PortfolioService {
  constructor(private readonly data: DataService) {}

  private readonly includes = {}

  createPortfolio(input: CreatePortfolioInput) {
    return this.data.portfolio.create({
      data: {
        ...input,
      },
    })
  }

  async getAllPortfolio() {
    return this.data.portfolio.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async getPortfolioById(id: number) {
    const found = await this.data.portfolio.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Portfolio with id: ${id} not found`)
    }
    return found
  }

  async updatePortfolio(id: number, input: UpdatePortfolioInput) {
    const found = await this.getPortfolioById(id)
    return this.data.portfolio.update({ where: { id: found.id }, data: { ...input } })
  }

  async deletePortfolio(id: number) {
    const found = await this.getPortfolioById(id)
    const deleted = this.data.portfolio.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
