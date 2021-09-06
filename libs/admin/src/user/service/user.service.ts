import { Prisma } from '@prisma/client'
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { DataService } from '@feature/core'
import { PasswordService, Role } from '@feature/auth'
import { ChangePasswordInput } from '../dto/change-password.input'
import { findManyCursorConnection } from '@feature/core/data/common/pagination/cursor-conecction'
import { CreateManagerInput } from '../dto/create-manager.input'

@Injectable()
export class UserService {
  constructor(private readonly _service: DataService, private _passwordService: PasswordService) {}

  private readonly includes = { profile: true }

  async approveUser(userId: number) {
    const found = await this.getUserById(userId)
    return this._service.user.update({
      data: {
        active: !found.active,
      },
      where: {
        id: found.id,
      },
    })
  }

  async changePassword(userId: number, userPassword: string, changePassword: ChangePasswordInput) {
    const passwordValid = await this._passwordService.validatePassword(changePassword.oldPassword, userPassword)

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    const hashedPassword = await this._passwordService.hashPassword(changePassword.newPassword)

    return this._service.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    })
  }

  async getAllUser() {
    return this._service.user.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async filter(after, before, first, last, query, orderBy) {
    const a = await findManyCursorConnection(
      (args) =>
        this._service.user.findMany({
          include: { profile: true },
          where: {
            OR: [
              {
                username: {
                  contains: query || '',
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: query || '',
                  mode: 'insensitive',
                },
              },
            ],
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this._service.user.count({
          where: {
            OR: [
              {
                username: {
                  contains: query || '',
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: query || '',
                  mode: 'insensitive',
                },
              },
            ],
          },
        }),
      { first, last, before, after },
    )
    return a
  }

  async createManager(input: CreateManagerInput) {
    const hashedPassword = await this._passwordService.hashPassword(input.password)

    try {
      const user = await this._service.user.create({
        data: {
          ...input,
          password: hashedPassword,
          role: Role.MANAGER,
          active: true,
        },
      })
      return user
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Email ${input.email} already used.`)
      } else {
        throw new Error(e)
      }
    }
  }

  async getUserById(id: number) {
    const found = await this._service.user.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`User with id: ${id} not found`)
    }
    return found
  }

  async deleteUser(id: number) {
    const found = await this.getUserById(id)
    const deleted = await this._service.user.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }

  async getStatistics() {
    const totalUsers = await this._service.user.count({ where: { role: Role.USER } })
    const usersApproved = await this._service.user.count({ where: { role: Role.USER, active: true } })
    const usersPending = totalUsers - usersApproved
    return { totalUsers, usersApproved, usersPending }
  }
}
