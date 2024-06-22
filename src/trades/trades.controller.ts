import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TradesService } from './trades.service';
import { Trade } from './trade.schema';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  async create(@Body() trade: Trade) {
    return this.tradesService.createTrade(trade);
  }

  @Get()
  async findAll() {
    return this.tradesService.getAllTrades();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tradesService.getTradeById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() trade: Trade) {
    return this.tradesService.updateTrade(id, trade);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tradesService.deleteTrade(id);
  }
}