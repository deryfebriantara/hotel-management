import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Hotel } from './hotel.model';
import { CreateHotelInput, UpdateHotelInput } from './hotel.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from 'apps/hotel-management-backend/generated/prisma';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Hotel], { name: 'hotels' })
  async getHotels(
    @Args('search', { nullable: true }) search?: string,
    @Args('sortBy', { nullable: true }) sortBy?: string,
    @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder?: 'asc' | 'desc',
  ) {

    const where: Prisma.HotelWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { location: { contains: search, mode: 'insensitive' } },
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

  @Query(() => Hotel, { name: 'hotel' })
  async getHotel(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.hotel.findUnique({
      where: { id },
      include: { bookings: true },
    });
  }

  @Mutation(() => Hotel)
  @UseGuards(JwtAuthGuard)
  async createHotel(@Args('input') input: CreateHotelInput) {
    return this.prisma.hotel.create({
      data: {
        name: input.name,
        location: input.location,
        description: input.description,
        image: input.image,
      },
    });
  }

  @Mutation(() => Hotel)
  @UseGuards(JwtAuthGuard)
  async updateHotel(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateHotelInput,
  ) {
    return this.prisma.hotel.update({
      where: { id },
      data: {
        name: input.name,
        location: input.location,
        description: input.description,
        image: input.image,
      },
    });
  }

  @Mutation(() => Hotel)
  @UseGuards(JwtAuthGuard)
  async deleteHotel(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.hotel.delete({
      where: { id },
    });
  }
}