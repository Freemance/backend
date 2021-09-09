import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { DataModule } from '@feature/core'
import { SecurityConfig } from '@feature/core/core/config/config.interface'
import { RolesGuard, AuthResolver, AuthService, JwtStrategy, GqlAuthGuard, PasswordService, EmailService } from '.'

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
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard, PasswordService, RolesGuard, EmailService],
  exports: [GqlAuthGuard, RolesGuard],
})
export class AuthModule {}
