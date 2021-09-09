import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { CoreResolver } from './core.resolver'
import { validationSchema } from './config/validation'
import config from '@feature/core/core/config/config'
import { GraphqlConfig } from '@feature/core/core/config/config.interface'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_ID, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
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
