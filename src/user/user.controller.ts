import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDto, UserIdDto } from './user.dtos';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  save(@Body() userDto: UserDto) {
    return this.userService.saveUser(userDto);
  }

  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  update(@Param() { id }: UserIdDto, @Body() userDto: UserDto) {
    return this.userService.saveUser({ ...userDto, id });
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get a single user' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  get(@Param() { id }: UserIdDto) {
    return this.userService.getUser(id);
  }
}
