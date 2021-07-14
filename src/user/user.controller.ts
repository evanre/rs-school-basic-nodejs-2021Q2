import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserDto, UserIdDto } from './user.dtos';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Post()
  async save(@Body() userDto: UserDto) {
    const user = await this.userService.save(userDto);
    return this.userService.toResponse(user);
  }

  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Put(':id')
  async update(@Param() { id }: UserIdDto, @Body() userDto: UserDto) {
    const user = await this.userService.save({ ...userDto, id });
    return this.userService.toResponse(user);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return users.map((user) => this.userService.toResponse(user));
  }

  @ApiOperation({ summary: 'Get a single user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get(':id')
  async get(@Param() { id }: UserIdDto) {
    const user = await this.userService.get(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.userService.toResponse(user);
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  async remove(@Param() { id }: UserIdDto) {
    const user = await this.userService.get(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.userService.remove(id);
  }
}
