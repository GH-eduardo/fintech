import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TradesModule } from './trades/trades.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/fintech'),
    UsersModule,
    TradesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
