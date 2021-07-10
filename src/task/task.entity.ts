import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ITask } from './task.interfaces';
import { IUser } from '../user/user.interfaces';
import { IBoard } from '../board/board.interfaces';
import { IColumn } from '../common/interfaces';

@Entity()
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Unique identifier',
  })
  public id!: string;

  @Column()
  @ApiProperty({
    example: 'Some title',
    description: 'Title of the task',
  })
  public title!: string;

  @Column('smallint', { nullable: true })
  @ApiPropertyOptional({
    example: 4,
    description: 'Order of the task',
  })
  order?: number;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    example: 'Some description',
    description: 'Description of the task',
  })
  description?: string;

  @ManyToOne('User', 'id', {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Tasks user id',
  })
  userId!: Pick<IUser, 'id'> | null;

  @ManyToOne('Board', 'id', {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Tasks board id',
  })
  boardId!: Pick<IBoard, 'id'>;

  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: '371c5b2a-8056-48c4-90c0-f7bf6bee9e7a',
    description: 'Tasks column id',
  })
  columnId!: Pick<IColumn, 'id'> | null;
}
