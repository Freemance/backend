import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { GqlAuthGuard, Role, User, UserEntity } from '@feature/auth'
import { RolesGuard } from '@feature/auth/guards/roles.guard'
import { Roles } from '@feature/auth/decorators/roles.decorator'
import { UserService } from '../service/user.service'
import { UpdateUserInput } from '../dto/update-user.input'
import { ChangePasswordInput } from '../dto/change-password.input'
import { UsersStatistics } from '../dto/userStatistics'
import { CreateManagerInput } from '../dto/create-manager.input'

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  @Query(() => User, { nullable: true })
  async me(@UserEntity() user: User): Promise<User> {
    return user
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => UsersStatistics, { nullable: true })
  async getUsersStatistics() {
    return await this._userService.getStatistics()
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(@UserEntity() user: User, @Args('data') newUserData: UpdateUserInput) {
    return this._userService.updateUser(user.id, newUserData)
  }

  @Mutation(() => User, { nullable: true })
  async changePassword(@UserEntity() user: User, @Args('data') changePassword: ChangePasswordInput) {
    return this._userService.changePassword(user.id, user.password, changePassword)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => [User], { name: 'users', nullable: 'items' })
  getAllUser() {
    return this._userService.getAllUser()
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => User, { name: 'user', nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this._userService.getUserById(id)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => User, { nullable: true })
  createManager(@Args('input') input: CreateManagerInput) {
    return this._userService.createManager(input)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => User, { nullable: true })
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this._userService.deleteUser(id)
  }
}
