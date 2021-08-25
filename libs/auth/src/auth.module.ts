import { AuthResolver } from './auth.resolver'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { ConfigService } from '@nestjs/config'
import { DataModule } from '@feature/core'
import { SecurityConfig } from '@feature/core/core/config/config.interface'
import { AuthService } from '@feature/auth/auth.service'
import { PasswordService } from '@feature/auth/password.service'
import { GqlAuthGuard } from '@feature/auth/guards/gql-auth.guard'

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
