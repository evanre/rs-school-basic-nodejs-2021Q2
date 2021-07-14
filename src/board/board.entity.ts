import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IBoard } from './board.interfaces';

@Entity()
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Unique identifier',
  })
  public id!: string;

  @Column()
  @ApiProperty({
    example: 'Some title',
    description: 'Title of the board',
  })
  public title!: string;

  @Column('jsonb', { nullable: true })
  @ApiPropertyOptional({
    example: '[{id: "alsdkfj", "Column name"}]',
    description: 'Columns of the board',
  })
  public columns!: [];
}
