import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './schemas/trade.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TradesService {
    constructor(@InjectModel(Trade.name) private tradeModel: Model<Trade>) {}

    createTrade(createTradeDto: CreateTradeDto) {
        const createdTrade = this.tradeModel.create(createTradeDto);
        return createdTrade;
    }

    getAllTrades() {
        return this.tradeModel.find();
    }

    getTradeById(id: string) {
        return this.tradeModel.findById(id);
    }

    async updateTrade(id: string, trade: UpdateTradeDto): Promise<Trade> {
        return await this.tradeModel.findByIdAndUpdate(id, trade, {
            new: true,
            runValidators: true,
        });
    }

    deleteTrade(id: string) {
        return this.tradeModel.findByIdAndDelete(id);
    }
}