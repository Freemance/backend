import { Resolver, Mutation, Args, Parent, ResolveField, Int } from '@nestjs/graphql'

import { LoginInput } from '../dto/login.input'
import { RefreshTokenInput } from '../dto/refresh-token.input'
import { SignupInput } from '../dto/signup.input'
import { Auth } from '../entities/auth.model'
import { Token } from '../entities/token.model'
import { AuthService } from '../service/auth.service'
import { resetPasswordInput } from '../dto/reset-password.input'

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly _authService: AuthService) {}

  @Mutation(() => Boolean)
  signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase()
    return this._authService.createUser(data)
  }

  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this._authService.login(email.toLowerCase(), password)

    return {
      accessToken,
      refreshToken,
    }
  }
  @Mutation(() => Auth)
  async verifyEmail(@Args() { token }: RefreshTokenInput) {
    const { accessToken, refreshToken } = await this._authService.verifyAccount(token)

    return {
      accessToken,
      refreshToken,
    }
  }
  @Mutation(() => Auth)
  async resetPassword(@Args('data') { token, password }: resetPasswordInput) {
    const { accessToken, refreshToken } = await this._authService.resetPassword(token, password)

    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation(() => Auth)
  async loginDashboard(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this._authService.login(email.toLowerCase(), password, true)

    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this._authService.refreshToken(token)
  }

  @Mutation(() => Boolean, { nullable: true })
  recoveryPassword(@Args({ name: 'email', type: () => String }) email: string) {
    return this._authService.recoveryPassword(email.toLowerCase())
  }

  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return await this._authService.getUserFromToken(auth.accessToken)
  }
}
