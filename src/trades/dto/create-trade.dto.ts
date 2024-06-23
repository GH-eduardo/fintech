export class CreateTradeDto {
  userId: string;
  stockSymbol: string;
  quantity: number;
  price: number;
  tradeType: 'buy' | 'sell';
  date: Date;
}