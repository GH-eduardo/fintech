import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './schemas/trade.schema';
import { InvalidQuantityException } from '../common/exceptions/InvalidQuantityException';
import { NothingFoundException } from '../common/exceptions/NothingFoundException';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) { }

  @Post()
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradesService.createTrade(createTradeDto);
  }

  @Get()
  async findAll() {
    const trades = await this.tradesService.getAllTrades();
    if (trades.length === 0) {
      throw new NothingFoundException();
    }
    return trades;
  }

  @Get('listStocks')
  async listStocks() {
    const stocks = await this.tradesService.listStocks();
    if (stocks.length === 0) {
      throw new NothingFoundException();
    }
    return stocks;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const trade = await this.tradesService.getTradeById(id);
    if (!trade) {
      throw new NotFoundException(`Trade with id ${id} not found!`);
    }
    return trade;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() trade: UpdateTradeDto): Promise<Trade> {
    const updatedTrade = await this.tradesService.updateTrade(id, trade);
    if (!updatedTrade) {
      throw new NotFoundException(`Trade with id ${id} not found`);
    }
    return updatedTrade;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.tradesService.deleteTrade(id);
    if (!deleted) {
      throw new NotFoundException(`Trade with ID ${id} not found`);
    }
    return { message: 'Trade deleted successfully' };
  }

  @Get(':userId/buy/:ticker/:quantity')
  buy(@Param('userId') userId: string, @Param('ticker') ticker: string, @Param('quantity') quantity: number) {
    if (quantity <= 0) {
      throw new InvalidQuantityException();
    }
    return this.tradesService.buyStocks(userId, ticker, quantity);
  }

  @Get(':userId/sell/:ticker/:quantity')
  sell(@Param('userId') userId: string, @Param('ticker') ticker: string, @Param('quantity') quantity: number) {
    if (quantity <= 0) {
      throw new InvalidQuantityException();
    }
    return this.tradesService.sellStocks(userId, ticker, quantity);
  }

}