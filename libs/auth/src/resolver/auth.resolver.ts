import { Resolver, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'
import { User } from '..'
import { LoginInput } from '../dto/login.input'
import { RefreshTokenInput } from '../dto/refresh-token.input'
import { SignupInput } from '../dto/signup.input'
import { Auth } from '../entities/auth.model'
import { Token } from '../entities/token.model'
import { AuthService } from '../service/auth.service'

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase()
    const { accessToken, refreshToken } = await this.authService.createUser(data)
    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.authService.login(email.toLowerCase(), password)

    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token)
  }

  @ResolveField('user', () => [User])
  async user(@Parent() auth: Auth) {
    return await this.authService.getUserFromToken(auth.accessToken)
  }
}
