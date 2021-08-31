import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AdminModule } from '@feature/admin'
import { AuthModule } from '@feature/auth/auth.module'
import { ClientModule } from '@feature/client'
import { CoreModule, DataModule } from '@feature/core'
import { LoggerMiddleware } from '../libs/middleware/logger/logger.middleware'

@Module({
  imports: [CoreModule, DataModule, AuthModule, AdminModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
