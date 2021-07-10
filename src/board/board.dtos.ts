import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BoardDto {
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
    description: 'Title of the board',
  })
  readonly title!: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: '[{id: "alsdkfj", "Column name"}]',
    description: 'Columns of the board',
  })
  readonly columns?: [];
}

export class BoardIdDto {
  @IsUUID(4, { message: 'Have to be a valid UUID' })
  @IsNotEmpty()
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Unique identifier',
  })
  readonly id!: string;
}
