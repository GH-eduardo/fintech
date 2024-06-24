import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateTradeDto {
  userId: string;
  @IsNotEmpty()
  ticker: string;
  @IsInt()
  @Min(0)
  quantity: number;
  @Min(0)
  price: number;
  tradeType: 'buy' | 'sell';
}