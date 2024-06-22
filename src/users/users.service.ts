import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(user: User): Promise<UserDocument> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async updateUser(id: string, updatedUser: User): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}