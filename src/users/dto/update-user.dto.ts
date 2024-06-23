
export class UpdateUserDto {
  readonly password: string;
  readonly balance: number;
  readonly stocks: Array<{name: string, quantity: number, investedValue: number}>;
}