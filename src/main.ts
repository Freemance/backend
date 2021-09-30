import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CorsConfig, NestConfig } from '@feature/core/core/config/config.interface'
import { graphqlUploadExpress } from 'graphql-upload'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  })
  // logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  // Validation
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const nestConfig = configService.get<NestConfig>('nest')
  const corsConfig = configService.get<CorsConfig>('cors')

  // Cors
  if (corsConfig.enabled) {
    app.enableCors()
  }

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 3333

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
    Logger.log('Listening at http://localhost:' + port + '/' + 'graphql')
  })
}
bootstrap()
