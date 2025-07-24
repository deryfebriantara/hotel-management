import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Hotel } from './hotel.model';
import { CreateHotelInput, UpdateHotelInput } from './hotel.dto';
import { HotelService } from './hotel.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query(() => [Hotel], { name: 'hotels' })
  async getHotels(
    @Args('search', { nullable: true }) search?: string,
    @Args('sortBy', { nullable: true }) sortBy?: string,
    @Args('sortOrder', { nullable: true, defaultValue: 'asc' })
    sortOrder?: 'asc' | 'desc',
  ) {
    return this.hotelService.findAll(search, sortBy, sortOrder);
  }

  @Query(() => Hotel, { name: 'hotel' })
  async getHotel(@Args('id', { type: () => Int }) id: number) {
    return this.hotelService.findOne(id);
  }

  @Mutation(() => Hotel)
  // @UseGuards(JwtAuthGuard)
  async createHotel(@Args('input') input: CreateHotelInput) {
    return this.hotelService.create(input);
  }

  @Mutation(() => Hotel)
  // @UseGuards(JwtAuthGuard)
  async updateHotel(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateHotelInput,
  ) {
    return this.hotelService.update(id, input);
  }

  @Mutation(() => Hotel)
  // @UseGuards(JwtAuthGuard)
  async deleteHotel(@Args('id', { type: () => Int }) id: number) {
    return this.hotelService.remove(id);
  }
}
