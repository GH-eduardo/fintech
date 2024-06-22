import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TradesModule } from './trades/trades.module';
import { UsersController } from './users/users.controller';
import { TradesController } from './trades/trades.controller';
import { UsersService } from './users/users.service';
import { TradesService } from './trades/trades.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/'),
    UsersModule,
    TradesModule,
  ],
  controllers: [UsersController, TradesController],
  providers: [UsersService, TradesService],
})
export class AppModule {}
