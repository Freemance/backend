import { PasswordService } from '@feature/auth'
import { DataService } from '@feature/core'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ChangePasswordInput, UpdateUserInput } from '..'

@Injectable()
export class UserService {
  constructor(private readonly data: DataService, private passwordService: PasswordService) {}

  private readonly includes = {}

  updateUser(userId: number, newUserData: UpdateUserInput) {
    return this.data.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    })
  }

  async changePassword(userId: number, userPassword: string, changePassword: ChangePasswordInput) {
    const passwordValid = await this.passwordService.validatePassword(changePassword.oldPassword, userPassword)

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    const hashedPassword = await this.passwordService.hashPassword(changePassword.newPassword)

    return this.data.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    })
  }

  async findAll() {
    return this.data.user.findMany({ orderBy: { id: 'asc' }, include: this.includes })
  }

  async findOne(id: number) {
    const found = await this.data.user.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Language with id: ${id} not found`)
    }
    return found
  }

  async remove(id: number) {
    const found = await this.findOne(id)
    const deleted = this.data.language.delete({
      where: {
        id: found.id,
      },
    })
    return !!deleted
  }
}
