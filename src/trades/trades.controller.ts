import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './schemas/trade.schema';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradesService.createTrade(createTradeDto);
  }

  @Get()
  findAll() {
    return this.tradesService.getAllTrades();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradesService.getTradeById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() trade: UpdateTradeDto): Promise<Trade> {
    return this.tradesService.updateTrade(id, trade);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tradesService.deleteTrade(id);
  }
}