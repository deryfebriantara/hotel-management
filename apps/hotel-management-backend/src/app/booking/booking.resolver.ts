import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Booking } from './booking.model';
import { CreateBookingInput } from './booking.dto';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Booking], { name: 'bookings' })
  async getBookings() {
    return this.prisma.booking.findMany({
      include: { hotel: true, customer: true },
    });
  }

  @Query(() => Booking, { name: 'booking' })
  async getBooking(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { hotel: true, customer: true },
    });
  }

  @Mutation(() => Booking)
  async createBooking(@Args('input') input: CreateBookingInput) {
    return this.prisma.booking.create({
      data: {
        hotelId: input.hotelId,
        customerId: input.customerId,
        checkIn: input.checkIn,
        checkOut: input.checkOut,
      },
      include: { hotel: true, customer: true },
    });
  }

  @Mutation(() => Booking)
  async deleteBooking(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.booking.delete({
      where: { id },
      include: { hotel: true, customer: true },
    });
  }
}