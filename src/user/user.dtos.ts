import {
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @IsUUID(4, { message: 'Have to be a valid UUID' })
  @IsOptional()
  @ApiPropertyOptional({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Unique identifier',
  })
  readonly id!: string;

  @IsString({ message: 'Need to be a string' })
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Ivan Ivanov',
    description: 'User full name',
  })
  readonly name?: string;

  @IsString({ message: 'Need to be a string' })
  @IsNotEmpty()
  @ApiProperty({
    example: 'ivan2112',
    description: 'User login',
  })
  readonly login!: string;

  @IsString({ message: 'Need to be a string' })
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @ApiProperty({
    example: 'P@55w0rd',
    description: 'User password',
  })
  readonly password!: string;
}

export class UserIdDto {
  @IsUUID(4, { message: 'Have to be a valid UUID' })
  @IsNotEmpty()
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Unique identifier',
  })
  readonly id!: string;
}
