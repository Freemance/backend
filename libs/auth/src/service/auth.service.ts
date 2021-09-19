import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Prisma, User } from '@prisma/client'
import { DataService } from '@feature/core'
import { SecurityConfig } from '@feature/core/core/config/config.interface'
import { PasswordService } from './password.service'
import { SignupInput } from '../dto/signup.input'
import { Token } from '../entities/token.model'
import { Role } from '../entities/user.entity'
import { PasswordResets } from '../entities/passwordResets.entity'
import { EmailService } from './email.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly _service: DataService,
    private readonly _jwtService: JwtService,
    private readonly _passwordService: PasswordService,
    private readonly _configService: ConfigService,
    private readonly _emailService: EmailService,
  ) {}

  private includeAll = {
    profile: {
      include: {
        tag: true,
        skills: true,
        socialLinks: true,
        employmentHistory: true,
        courses: true,
        portfolioItem: true,
        languages: true,
      },
    },
  }

  async createUser(payload: SignupInput) {
    const hashedPassword = await this._passwordService.hashPassword(payload.password)

    const confirmToken = this._jwtService.sign(
      { email: payload.email },
      {
        secret: this._configService.get('JWT_CONFIRM_SECRET'),
        expiresIn: '15m',
      },
    )

    try {
      const user = await this._service.user.create({
        data: {
          email: payload.email,
          username: payload.username,
          password: hashedPassword,
          role: Role.USER,
          token: confirmToken,
          profile: {
            create: {
              slykUser: payload.slykUser,
              firstName: payload.firstName,
              lastName: payload.lastName,
              socialLinks: {
                create: {},
              },
            },
          },
        },
      })

      this._emailService.verifyRequest(user, confirmToken)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Email ${payload.email} already used.`)
      } else {
        throw new Error(e)
      }
    }

    return true
  }

  async login(email: string, password: string, loginAsManager = false): Promise<Token> {
    const user = await this._service.user.findUnique({ where: { email }, include: { profile: true } })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    const passwordValid = await this._passwordService.validatePassword(password, user.password)

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }
    if ((loginAsManager && user.role === Role.USER) || (!loginAsManager && user.role !== Role.USER) || !user.active) {
      throw new UnauthorizedException('Unauthorized')
    }

    return this.generateTokens({
      userId: user.id,
    })
  }

  validateUser(userId: number): Promise<User> {
    return this._service.user.findFirst({ where: { id: userId, active: true }, include: { profile: true } })
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this._jwtService.decode(token)['userId']
    return this._service.user.findUnique({ where: { id }, include: this.includeAll })
  }

  generateTokens(payload: { userId: number }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }

  private generateAccessToken(payload: { userId: number }): string {
    return this._jwtService.sign(payload)
  }

  private generateRefreshToken(payload: { userId: number }): string {
    const securityConfig = this._configService.get<SecurityConfig>('security')
    return this._jwtService.sign(payload, {
      secret: this._configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    })
  }

  refreshToken(token: string) {
    try {
      const { userId } = this._jwtService.verify(token, {
        secret: this._configService.get('JWT_REFRESH_SECRET'),
      })

      return this.generateTokens({
        userId,
      })
    } catch (e) {
      throw new UnauthorizedException()
    }
  }

  async verifyAccount(token: string): Promise<Token> {
    let user = await this._service.user.findFirst({ where: { token: token, active: false } })

    if (!user) {
      throw new NotFoundException('This token is not valid')
    }

    user = await this._service.user.update({
      data: {
        active: !user.active,
      },
      where: {
        id: user.id,
      },
    })

    return this.generateTokens({
      userId: user.id,
    })
  }

  async resetPassword(token: string, password: string): Promise<Token> {
    const hashedPassword = await this._passwordService.hashPassword(password)
    const passwordResets = await this._service.passwordResets.findFirst({ where: { token: token } })
    if (!passwordResets) {
      throw new NotFoundException('This token is not valid')
    }
    try {
      const user = await this._service.user.update({
        data: {
          password: hashedPassword,
        },
        where: {
          email: passwordResets.email,
        },
      })

      await this._service.passwordResets.delete({
        where: {
          email: passwordResets.email,
        },
      })

      return this.generateTokens({
        userId: user.id,
      })
    } catch (e) {
      throw new NotFoundException(`No user found for email: ${passwordResets.email}`)
    }
  }

  async recoveryPassword(email: string) {
    const foundUser = await this._service.user.findFirst({ where: { email: email, active: true } })
    if (!foundUser) throw new NotFoundException(`No user found for email: ${email}`)
    const tokenModel = await this.createPasswordResetToken(email)
    await this._emailService.resetPassword(foundUser, tokenModel.token)
    return true
  }

  async resentEmailConfirmation(email: string) {
    const foundUser = await this._service.user.findFirst({ where: { email: email, active: false } })
    if (!foundUser) throw new NotFoundException(`No user found for email: ${email}`)
    const confirmToken = this._jwtService.sign(
      { email: email },
      {
        secret: this._configService.get('JWT_CONFIRM_SECRET'),
        expiresIn: '15m',
      },
    )

    const user = await this._service.user.update({
      data: {
        token: confirmToken,
      },
      where: {
        id: foundUser.id,
      },
    })
    await this._emailService.resetPassword(foundUser, confirmToken)
    return true
  }

  async createPasswordResetToken(email: string): Promise<PasswordResets> {
    let passwordReset = await this._service.passwordResets.findUnique({ where: { email: email } })
    if (passwordReset && (new Date().getTime() - passwordReset.timestamp.getTime()) / 60000 < 2) {
      throw new NotFoundException(`Recently send email: ${email}`)
    } else {
      passwordReset = await this._service.passwordResets.upsert({
        where: {
          email: email,
        },
        update: {
          token: this._jwtService.sign(
            { email: email },
            {
              secret: this._configService.get('JWT_CONFIRM_SECRET'),
              expiresIn: '15m',
            },
          ),
          timestamp: new Date(),
        },
        create: {
          email: email,
          token: this._jwtService.sign(
            { email: email },
            {
              secret: this._configService.get('JWT_CONFIRM_SECRET'),
              expiresIn: '15m',
            },
          ),
          timestamp: new Date(),
        },
      })
      return passwordReset
    }
  }
}
