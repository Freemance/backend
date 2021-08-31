import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DataService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly _config: ConfigService) {
    super()
  }
  public async onModuleDestroy() {
    await this.$disconnect()
  }

  public async onModuleInit() {
    await this.$connect()
    await this.ensureAdminUser()
  }

  async createAdminUser() {
    const hashPassword = (): string => hash(process.env.ADMIN_PASSWORD, 10)

    return this.user.create({
      data: {
        email: 'admin@admin.com',
        password: await hashPassword(),
        firstName: 'admin',
        lastName: 'admin',
        role: 'ADMIN',
      },
    })
  }

  private async ensureAdminUser() {
    const admins = await this.user.count({ where: { role: 'ADMIN' } })
    if (admins > 0) {
      return true
    } else {
      this.createAdminUser()
      Logger.log('Admin user created admin@admin.com')
    }
  }
}
