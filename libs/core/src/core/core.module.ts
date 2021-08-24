import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { CoreResolver } from './core.resolver'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
