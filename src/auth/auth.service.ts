import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dtos';
import { IUser } from '../user/user.interfaces';
import { LoginDto } from './auth.dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: UserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Bad request. Already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.saveUser(userDto);

    return this.generateToken(user);
  }

  private async generateToken({ login, id }: IUser) {
    return {
      token: this.jwtService.sign({ login, id }),
    };
  }

  private async validateUser({ login, password }: LoginDto) {
    const user = await this.userService.getUserByLogin(login);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid credentials' });
  }
}
