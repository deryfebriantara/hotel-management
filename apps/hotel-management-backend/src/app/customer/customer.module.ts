import { Module } from '@nestjs/common';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CustomerResolver, CustomerService, PrismaService],
})
export class CustomerModule {}