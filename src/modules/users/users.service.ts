import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  async createUser(dto: CreateUserDto) {}

  async getAllUsers() {}

  async getUserByEmail(email: string) {}

  async addRole(dto: AddRoleDto) {}

  async ban(dto: BanUserDto) {}
}
