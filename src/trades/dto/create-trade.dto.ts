import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateTradeDto {
  userId: string;
  @IsNotEmpty()
  ticker: string;
  @IsInt()
  @Min(1)
  quantity: number;
  @Min(0.01)
  price: number;
  tradeType: 'buy' | 'sell';
}