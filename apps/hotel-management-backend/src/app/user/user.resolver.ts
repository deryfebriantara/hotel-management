import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { CreateUserInput, UpdateUserInput, LoginUserInput } from './user.dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.userService.findAllUsers();
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findUserById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginUserInput) {
    const { access_token } = await this.userService.login(input.email, input.password);
    return access_token;
  }
}