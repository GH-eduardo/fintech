import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trade extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  ticker: string; //ou stock symbol código da ação

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  tradeType: 'buy' | 'sell';

  @Prop({ default: 'open'})
  status: 'open' | 'closed' | 'cancelled';

  @Prop({ default: () => new Date() })
  creation_date: Date;

  @Prop({ default: null })
  closing_date: Date;
}

export const TradeSchema = SchemaFactory.createForClass(Trade);