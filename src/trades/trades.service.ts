import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trade, TradeDocument } from './trade.schema';

@Injectable()
export class TradesService {
    constructor(@InjectModel(Trade.name) private tradeModel: Model<TradeDocument>) {}

    async createTrade(trade: Trade): Promise<Trade> {
        const createdTrade = new this.tradeModel(trade);
        return createdTrade.save();
    }

    async getAllTrades(): Promise<Trade[]> {
        return this.tradeModel.find().exec();
    }

    async getTradeById(id: string): Promise<Trade | null> {
        return this.tradeModel.findById(id).exec();
    }

    async updateTrade(id: string, updatedTrade: Trade): Promise<Trade | null> {
        return this.tradeModel.findByIdAndUpdate(id, updatedTrade, { new: true }).exec();
    }

    async deleteTrade(id: string): Promise<Trade | null> {
        return this.tradeModel.findByIdAndDelete(id).exec();
    }
}