import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../user/user.dtos';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dtos';

@Controller('/')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @Post('/register')
  register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }
}
