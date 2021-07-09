import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString({ message: 'Need to be a string' })
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @IsString({ message: 'Need to be a string' })
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
