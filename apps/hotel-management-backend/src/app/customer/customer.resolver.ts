import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Customer } from './customer.model';
import { CreateCustomerInput, UpdateCustomerInput } from './customer.dto';
import { CustomerService } from './customer.service';
import { LoginUserInput } from '../user/user.dto';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private customerService: CustomerService) {}

  @Query(() => [Customer], { name: 'customers' })
  async getCustomers() {
    return this.customerService.findAllCustomers();
  }

  @Query(() => Customer, { name: 'customer' })
  async getCustomer(@Args('id', { type: () => Int }) id: number) {
    return this.customerService.findCustomerById(id);
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('input') input: CreateCustomerInput) {
    return this.customerService.createCustomer(input);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateCustomerInput,
  ) {
    return this.customerService.updateCustomer(id, input);
  }

  @Mutation(() => Customer)
  async deleteCustomer(@Args('id', { type: () => Int }) id: number) {
    return this.customerService.deleteCustomer(id);
  }

   @Mutation(() => String)
    async loginCustomer(@Args('input') input: LoginUserInput) {
      const { access_token } = await this.customerService.customerLogin(input.email, input.password);
      return access_token;
    }
}