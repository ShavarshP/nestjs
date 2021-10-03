import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schema/user.shema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/schema/user.shema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({ email: userDto.email });

      if (!user) {
        throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
      }

      const isMatch = await bcrypt.compare(userDto.password, user.password);

      if (!isMatch) {
        throw new HttpException(
          'Invalid password, please try again',
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = await this.jwtService.signAsync({ userId: user.id });
      return { token, userId: user.id };
    } catch (error) {}
  }

  async registration(userDto: CreateUserDto) {
    const { email, userName, password } = userDto;

    const candidate = await this.findUser(email);

    if (candidate) {
      throw new HttpException(
        'This user already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new this.userModel({
      email,
      userName,
      password: hashedPassword,
    });
    user.save();
    return new HttpException('user created', HttpStatus.CREATED);
  }

  private async findUser(email: string) {
    const candidate = await this.userModel.findOne({ email });
    return candidate;
  }

  // private async generateToken(user: User) {}

  private async validateUser(userDto: CreateUserDto) {}
}
