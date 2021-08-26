import {User} from '@feature/auth';
import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {CreateUserInput, UpdateUserInput, UserService } from '..';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {
    }

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }

    @Query(() => [User], {name: 'user'})
    findAll() {
        return this.userService.findAll();
    }

    @Query(() => User, {name: 'user'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.userService.findOne(id);
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput.id, updateUserInput);
    }

    @Mutation(() => User)
    removeUser(@Args('id', {type: () => Int}) id: number) {
        return this.userService.remove(id);
    }
}
