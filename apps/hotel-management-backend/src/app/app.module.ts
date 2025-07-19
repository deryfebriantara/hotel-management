import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaService } from './prisma/prisma.service';
import { HotelModule } from './hotel/hotel.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    HotelModule,
    UserModule,
    CustomerModule,
    BookingModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}