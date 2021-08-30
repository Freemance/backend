import { GqlAuthGuard, Role, User, UserEntity } from '@feature/auth'
import { UseGuards } from '@nestjs/common/decorators/core'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ChangePasswordInput, UpdateUserInput, UserService } from '..'
import { Roles } from '@feature/auth/decorators/roles.decorator'
import { RolesGuard } from '@feature/auth/guards/roles.guard'
@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  async me(@UserEntity() user: User): Promise<User> {
    return user
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(@UserEntity() user: User, @Args('data') newUserData: UpdateUserInput) {
    return this.userService.updateUser(user.id, newUserData)
  }

  @Mutation(() => User, { nullable: true })
  async changePassword(@UserEntity() user: User, @Args('data') changePassword: ChangePasswordInput) {
    return this.userService.changePassword(user.id, user.password, changePassword)
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => [User], { name: 'users', nullable: 'items' })
  getAllUser() {
    return this.userService.getAllUser()
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => User, { name: 'user', nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => User, { nullable: true })
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.deleteUser(id)
  }
}
