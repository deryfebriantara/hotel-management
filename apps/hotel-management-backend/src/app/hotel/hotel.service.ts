import { Injectable } from '@nestjs/common';
import { PrismaService }        from '../prisma/prisma.service';
import { Prisma, Hotel }        from 'apps/hotel-management-backend/generated/prisma';
import { CreateHotelInput, UpdateHotelInput } from './hotel.dto';

@Injectable()
export class HotelService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    search?: string,
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<Hotel[]> {
    const where: Prisma.HotelWhereInput = search
      ? {
          OR: [
            { name:        { contains: search, mode: 'insensitive' } },
            { location:    { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy: Prisma.HotelOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder }
      : { createdAt: 'desc' };

    return this.prisma.hotel.findMany({
      where,
      orderBy,
      include: { bookings: true },
    });
  }

  async findOne(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({
      where: { id },
      include: { bookings: true },
    });
  }

  async create(input: CreateHotelInput): Promise<Hotel> {
    const data: Prisma.HotelCreateInput = {
      name:        input.name,
      location:    input.location,
      description: input.description,
      image:       input.image,
    };
    return this.prisma.hotel.create({ data });
  }

  async update(id: number, input: UpdateHotelInput): Promise<Hotel> {
    const data: Prisma.HotelUpdateInput = {
      name:        input.name,
      location:    input.location,
      description: input.description,
      image:       input.image,
    };
    return this.prisma.hotel.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Hotel> {
    return this.prisma.hotel.delete({ where: { id } });
  }
}
