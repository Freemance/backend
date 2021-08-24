import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DataService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly config: ConfigService) {
    super()
  }
  public async onModuleDestroy() {
    await this.$disconnect()
  }

  public async onModuleInit() {
    await this.$connect()
  }
}
