import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    createUser(createUserDto: CreateUserDto) {
        const createdUser = this.userModel.create(createUserDto);
        return createdUser;
    }

    getAllUsers() {
        return this.userModel.find();
    }

    getUserById(id: string) {
        return this.userModel.findById(id);
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}