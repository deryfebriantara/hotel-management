import { Module } from '@nestjs/common';
import { HotelResolver } from './hotel.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { HotelService } from './hotel.service';

@Module({
  imports: [AuthModule],
  providers: [HotelResolver, PrismaService, HotelService],
})
export class HotelModule {}