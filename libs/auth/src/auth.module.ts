import { PasswordService } from './service/password.service'
import { GqlAuthGuard } from './guards/gql-auth.guard'
import { JwtStrategy } from './jwt.strategy'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { DataModule } from '@feature/core'
import { SecurityConfig } from '@feature/core/core/config/config.interface'
import { AuthService } from './service/auth.service'
import { AuthResolver } from './resolver/auth.resolver'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security')
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        }
      },
      inject: [ConfigService],
    }),
    DataModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard, PasswordService],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
