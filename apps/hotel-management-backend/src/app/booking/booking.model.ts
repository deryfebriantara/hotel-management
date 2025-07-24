import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Hotel } from '../hotel/hotel.model';
import { Customer } from '../customer/customer.model';

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  hotelId: number;

  @Field(() => Int)
  customerId: number;

  @Field()
  checkIn: Date;

  @Field()
  checkOut: Date;

  @Field()
  createdAt: Date;

  @Field(() => Hotel)
  hotel: Hotel;

  @Field(() => Customer)
  customer: Customer;
}