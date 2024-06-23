import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './schemas/trade.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class TradesService {
    constructor(@InjectModel(Trade.name) private tradeModel: Model<Trade>,
        private httpService: HttpService, private usersService: UsersService) { }

    async createTrade(createTradeDto: CreateTradeDto) {
        const createdTrade = await this.tradeModel.create(createTradeDto);

        let userID = createdTrade.userId;
        let user: User = await this.usersService.getUserById(userID);
        user.historic.push(createdTrade);
        await this.usersService.updateUser(userID, user);

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

    async listStocks() {
        const url = `https://brapi.dev/api/quote/list?sortBy=volume`;
        const token = 'aJ8y3fKhLkFeMh327cqFZU';
        const response = await firstValueFrom(this.httpService.get(url, {
            headers: { 'Authorization': `Bearer ${token}` },
        }));
        console.log(response);
        const stocks = response.data.stocks;
        console.log(stocks);
        return stocks;
    }

    async buyStocks(userId: string, ticker: string, quantity: number) {
        try {
            const url = `https://brapi.dev/api/quote/${ticker}`;
            const token = 'aJ8y3fKhLkFeMh327cqFZU';
            const response = await firstValueFrom(this.httpService.get(url, {
                headers: { 'Authorization': `Bearer ${token}` },
            }));
            const price = response.data.results[0].regularMarketPrice;
            const totalValue = price * quantity;
            let user: User = await this.usersService.getUserById(userId);
            if (user.balance < totalValue) {
                throw new Error(`Insufficient balance to buy stocks!\n 
                    (your balance: ${user.balance}, price of ${quantity} stocks of ${ticker}: ${totalValue})`);
            }
            else {
                if (user.stocks.some(stock => stock.name === ticker)) {
                    const existingStock = user.stocks.find(stock => stock.name === ticker);
                    existingStock.quantity = Number(existingStock.quantity) + Number(quantity);
                    existingStock.investedValue += totalValue;
                } else {
                    const newStock = {
                        name: ticker,
                        quantity: quantity,
                        investedValue: totalValue
                    };
                    user.stocks.push(newStock);
                }
                user.balance -= totalValue;
                await this.usersService.updateUser(userId, user);

                await this.createTrade({
                    userId: userId,
                    ticker: ticker,
                    quantity: quantity,
                    price: price,
                    tradeType: 'buy'
                });
                return `Parabéns ${user.name}! Você comprou ${quantity} ações de ${ticker} por R$ ${totalValue}! seu saldo atual é: R$ ${user.balance}`
            }
        } catch (error) {
            console.log(error);
        }
    }

    async sellStocks(userId: string, ticker: string, quantity: number) {
        try {
            const url = `https://brapi.dev/api/quote/${ticker}`;
            const token = 'aJ8y3fKhLkFeMh327cqFZU';
            const response = await firstValueFrom(this.httpService.get(url, {
                headers: { 'Authorization': `Bearer ${token}` },
            }));
            const price = response.data.results[0].regularMarketPrice;
            const totalValue = price * quantity;
            let user: User = await this.usersService.getUserById(userId);

            if (user.stocks.some(stock => stock.name === ticker) && user.stocks.find(stock => stock.name === ticker).quantity >= quantity) {
                const existingStock = user.stocks.find(stock => stock.name === ticker);
                console.log(`quantidade de ações de '${existingStock.name}': ${existingStock.quantity}`)
                console.log(`valor investido em '${existingStock.name}': ${existingStock.investedValue}`)
                const averageSharePrice = existingStock.investedValue / existingStock.quantity;
                console.log(`preço médio da ação '${existingStock.name}': ${averageSharePrice}`);
                const cost = averageSharePrice * quantity;
                existingStock.quantity = Number(existingStock.quantity) - Number(quantity);
                existingStock.investedValue -= cost;
            } else if (user.stocks.some(stock => stock.name === ticker) && user.stocks.find(stock => stock.name === ticker).quantity < quantity) {
                throw new Error(`You have ${user.stocks.find(stock => stock.name === ticker).quantity} stocks of ${ticker} but you are trying to sell ${quantity}`);
            }
            else {
                throw new Error(`You don't have any stocks of ${ticker} to sell ${user.name}!`);
            }
            user.balance += totalValue;
            await this.usersService.updateUser(userId, user);

            await this.createTrade({
                userId: userId,
                ticker: ticker,
                quantity: quantity,
                price: price,
                tradeType: 'sell'
            });
            return `Parabéns ${user.name}! Você vendeu ${quantity} ações de ${ticker} por R$ ${totalValue}! seu saldo atual é: R$ ${user.balance}`
        }
        catch (error) {
            console.log(error);
        }
    }
}