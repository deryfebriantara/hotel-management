import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Booking } from '../booking/booking.model';

@ObjectType()
export class Hotel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  location: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Booking], { nullable: true })
  bookings?: Booking[];
}