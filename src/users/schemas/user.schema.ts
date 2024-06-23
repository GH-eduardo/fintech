import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Trade } from 'src/trades/schemas/trade.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  //saldo do usuário
  @Prop({ default: 0 })
  balance: number;

  //array de ações adquiridas pelo usuário
  @Prop({ default: [] })
  stocks: Array<{name: string, quantity: number, investedValue: number}>;

  @Prop({ default: [] })
  historic: Array<Trade>;
}

export const UserSchema = SchemaFactory.createForClass(User);