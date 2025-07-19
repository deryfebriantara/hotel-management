import { Module } from '@nestjs/common';
import { HotelResolver } from './hotel.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [HotelResolver, PrismaService],
})
export class HotelModule {}