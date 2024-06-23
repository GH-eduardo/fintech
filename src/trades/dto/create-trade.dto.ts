export class CreateTradeDto {
  userId: string;
  ticker: string;
  quantity: number;
  price: number;
  tradeType: 'buy' | 'sell';
}