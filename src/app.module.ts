import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { TradesModule } from './trades/trades.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://0.0.0.0/fintech'),
    UsersModule,
    TradesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
