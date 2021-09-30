import { Plugin } from '@nestjs/graphql'
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base'
import { Logger } from '@nestjs/common'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart() {
    Logger.log('Start Request')
    return {
      async willSendResponse() {
        Logger.log('Will send response')
      },
    }
  }
}
