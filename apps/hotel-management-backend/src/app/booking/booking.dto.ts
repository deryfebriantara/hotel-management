import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field(() => Int)
  hotelId: number;

  @Field(() => Int)
  customerId: number;

  @Field()
  checkIn: Date;

  @Field()
  checkOut: Date;
}