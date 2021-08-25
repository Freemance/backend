import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const globalPrefix = 'api'
  const port = process.env.PORT || 3333

  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
    Logger.log('Listening at http://localhost:' + port + '/' + 'graphql')
    Logger.log(`Running in ${config.get('environment')} mode`)
  })
}
bootstrap()
