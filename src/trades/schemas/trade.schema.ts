import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trade extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  stockSymbol: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  tradeType: 'buy' | 'sell';
}

export const TradeSchema = SchemaFactory.createForClass(Trade);

export type TradeDocument = Trade & Document;