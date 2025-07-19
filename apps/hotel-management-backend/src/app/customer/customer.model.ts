import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Booking } from '../booking/booking.model';

@ObjectType()
export class Customer {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Booking], { nullable: true })
  bookings?: Booking[];
}