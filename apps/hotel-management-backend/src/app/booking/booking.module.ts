import { Module } from '@nestjs/common';
import { BookingResolver } from './booking.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [BookingResolver, PrismaService],
})
export class BookingModule {}