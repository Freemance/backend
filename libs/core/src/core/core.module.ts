import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { CoreResolver } from './core.resolver'
import { validationSchema } from './config/validation'
import config from '@feature/core/core/config/config'
import { GraphqlConfig } from '@feature/core/core/config/config.interface'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql')
        return {
          installSubscriptionHandlers: true,
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: true,
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          uploads: false,
          context: ({ req }) => ({ req }),
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
