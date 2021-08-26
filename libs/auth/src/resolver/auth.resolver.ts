import { Resolver, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'
import { Auth, AuthService, LoginInput, RefreshTokenInput, SignupInput, Token } from '..'

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase()
    const { accessToken, refreshToken } = await this.auth.createUser(data)
    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(email.toLowerCase(), password)

    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token)
  }

  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken)
  }
}
