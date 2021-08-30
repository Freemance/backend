import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { DataService } from '@feature/core'
import { PasswordService, Role } from '@feature/auth'
import { ChangePasswordInput } from '../dto/change-password.input'
import { UpdateUserInput } from '../dto/update-user.input'

@Injectable()
export class UserService {
  constructor(private readonly _service: DataService, private _passwordService: PasswordService) {}

  private readonly includes = { profile: true }

  updateUser(userId: number, newUserData: UpdateUserInput) {
    return this._service.user.update({
      data: newUserData,
      where: {
        id: userId,
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

  async getUserById(id: number) {
    const found = await this._service.user.findUnique({ where: { id }, include: this.includes })
    if (!found) {
      throw new NotFoundException(`User with id: ${id} not found`)
    }
    return found
  }

  async deleteUser(id: number) {
    const found = await this.getUserById(id)
    const deleted = this._service.user.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }

  async getStatistics() {
    const totalUsers = await this._service.user.count({ where: { role: Role.USER } })
    const usersAproved = await this._service.user.count({ where: { role: Role.USER, state: true } })
    const usersPending = totalUsers - usersAproved
    return { totalUsers, usersAproved, usersPending }
  }
}
