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

  toResponse(user: IUser): Omit<IUser, 'password'> {
    delete user.password;
    return user;
  }

  async save(userDto: UserDto): Promise<IUser> {
    const hash = await this.hashPassword(userDto.password);
    return await this.userRepository.save({ ...userDto, password: hash });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async get(value: string, param = 'id'): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { [param]: value } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
