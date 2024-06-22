import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trade, TradeSchema } from './trade.schema';
import { TradesController } from './trades.controller';
import { TradesService } from './trades.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trade.name, schema: TradeSchema }]),
  ],
  controllers: [TradesController],
  providers: [TradesService],
})
export class TradesModule {}