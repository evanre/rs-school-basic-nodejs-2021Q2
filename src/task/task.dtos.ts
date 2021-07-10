import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskDto {
  @IsUUID(4, { message: 'Have to be a valid UUID' })
  @IsOptional()
  @ApiPropertyOptional({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Unique identifier',
  })
  readonly id!: string;

  @IsString({ message: 'Need to be a string' })
  @IsNotEmpty()
  @ApiProperty({
    example: 'Some title',
    description: 'Title of the task',
  })
  readonly title!: string;

  @IsString({ message: 'Need to be a string' })
  @IsOptional()
  @ApiPropertyOptional({
    example: '[{id: "alsdkfj", "Column name"}]',
    description: 'Columns of the task',
  })
  readonly columns?: [];
}

export class TaskIdDto {
  @IsUUID(4, { message: 'Have to be a valid UUID' })
  @IsNotEmpty()
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Unique identifier',
  })
  readonly id!: string;
}
