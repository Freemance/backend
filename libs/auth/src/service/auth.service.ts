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

@Injectable()
export class AuthService {
  constructor(
    private readonly _service: DataService,
    private readonly _jwtService: JwtService,
    private readonly _passwordService: PasswordService,
    private readonly _configService: ConfigService,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this._passwordService.hashPassword(payload.password)

    try {
      const user = await this._service.user.create({
        data: {
          email: payload.email,
          username: payload.username,
          password: hashedPassword,
          role: Role.USER,
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

      return this.generateTokens({
        userId: user.id,
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Email ${payload.email} already used.`)
      } else {
        throw new Error(e)
      }
    }
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
    if ((loginAsManager && user.role === Role.USER) || (!loginAsManager && user.role !== Role.USER)) {
      throw new UnauthorizedException('Unauthorized')
    }

    return this.generateTokens({
      userId: user.id,
    })
  }

  validateUser(userId: number): Promise<User> {
    return this._service.user.findUnique({ where: { id: userId }, include: { profile: true } })
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this._jwtService.decode(token)['userId']
    return this._service.user.findUnique({ where: { id }, include: { profile: true } })
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
}
