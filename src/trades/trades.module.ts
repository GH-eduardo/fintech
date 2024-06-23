import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trade, TradeSchema } from './schemas/trade.schema';
import { TradesController } from './trades.controller';
import { TradesService } from './trades.service';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trade.name, schema: TradeSchema }]),
    HttpModule,
    UsersModule,
  ],
  controllers: [TradesController],
  providers: [TradesService],
})
export class TradesModule {}