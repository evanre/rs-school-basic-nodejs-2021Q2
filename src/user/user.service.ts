import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { IUser } from './user.interfaces';
import { UserDto } from './user.dtos';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async saveUser(userDto: UserDto): Promise<IUser> {
    const hash = await this.hashPassword(userDto.password);
    return await this.userRepository.save({ ...userDto, password: hash });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async getUserByLogin(login: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async removeUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
