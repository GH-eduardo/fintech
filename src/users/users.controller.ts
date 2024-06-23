import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';	
import { User } from './schemas/user.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, user);
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
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}