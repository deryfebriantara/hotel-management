import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerInput, UpdateCustomerInput } from './customer.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
 private jwtService: JwtService,) {}

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

  async customerLogin(email: string, password: string) {
      const user = await this.prisma.customer.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}