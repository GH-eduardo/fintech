import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TradesService } from './trades.service';
// import { Trade } from './schemas/trade.schema';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';

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
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradesService.updateTrade(id, updateTradeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tradesService.deleteTrade(id);
  }
}