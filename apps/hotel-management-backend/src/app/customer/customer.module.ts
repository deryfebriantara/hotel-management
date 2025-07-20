import { Module } from '@nestjs/common';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[AuthModule],  
  providers: [CustomerResolver, CustomerService, PrismaService],
})
export class CustomerModule {}