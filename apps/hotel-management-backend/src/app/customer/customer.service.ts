import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerInput, UpdateCustomerInput } from './customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(input: CreateCustomerInput) {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    return this.prisma.customer.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
      },
    });
  }

  async updateCustomer(id: number, input: UpdateCustomerInput) {
    const data: any = { name: input.name };
    if (input.password) {
      data.password = await bcrypt.hash(input.password, 10);
    }
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async deleteCustomer(id: number) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  async findCustomerById(id: number) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: { bookings: true },
    });
  }

  async findAllCustomers() {
    return this.prisma.customer.findMany({
      include: { bookings: true },
    });
  }
}