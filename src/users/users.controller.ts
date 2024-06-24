import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';	
import { User } from './schemas/user.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { NothingFoundException } from 'src/common/exceptions/NothingFoundException';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.getAllUsers();
    if (users.length === 0) {
      throw new NothingFoundException();
    }
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    const updatedUser = await this.usersService.updateUser(id, user);
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  @Put(':id/:deposit')
  async buy(@Param('id') id: string, @Param('deposit') deposit: number): Promise<User> {
  if (deposit <= 0) {
    throw new BadRequestException('O valor do depósito deve ser positivo.');
  }
  const user = await this.usersService.getUserById(id);
  if (!user) {
    throw new NotFoundException('Usuário não encontrado.');
  }
  user.balance = Number(user.balance) + Number(deposit);

  const updatedUser = await this.usersService.updateUser(id, user);

  return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.usersService.deleteUser(id);
    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }
}