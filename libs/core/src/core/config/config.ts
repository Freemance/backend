import { Config } from './config.interface'

const config: Config = {
  nest: {
    port: 3000,
    environment: process.env.NODE_ENV,
  },
  cors: {
    enabled: true,
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '40m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
}

export default (): Config => config
