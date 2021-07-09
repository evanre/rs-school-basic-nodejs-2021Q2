import { Column as Col, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser } from './user.interfaces';

@Entity()
export class User implements IUser {
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Col()
  @ApiPropertyOptional({
    example: 'Ivan Ivanov',
    description: 'User full name',
  })
  public name?: string;

  @Col({ unique: true })
  @ApiProperty({
    example: 'ivan2112',
    description: 'User login',
  })
  public login!: string;

  @Col()
  @ApiProperty({
    example: 'P@55w0rd',
    description: 'User password',
  })
  public password!: string;
}
