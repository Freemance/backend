import { Module } from '@nestjs/common'
import { AdminModule } from '@feature/admin'
import { AuthModule } from '@feature/auth/auth.module'
import { ClientModule } from '@feature/client'
import { CoreModule, DataModule } from '@feature/core'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    CoreModule,
    DataModule,
    AuthModule,
    AdminModule,
    ClientModule,
    GraphQLModule.forRoot({
      introspection: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
