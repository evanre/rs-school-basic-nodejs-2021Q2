import { Entity, PrimaryGeneratedColumn, Column as Col } from 'typeorm';
import { IUser, IBoard, IColumn, ITask } from '../common/interfaces';

@Entity({ name: 'task' })
export default class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Col('varchar', { length: 50 })
  title!: string;

  @Col('smallint')
  order!: number;

  @Col('varchar', { length: 255 })
  description!: string;

  @Col('varchar', { length: 36, nullable: true })
  userId!: Pick<IUser, 'id'> | null;

  @Col('varchar', { length: 36, nullable: true })
  boardId!: Pick<IBoard, 'id'> | null;

  @Col('varchar', { length: 36, nullable: true })
  columnId!: Pick<IColumn, 'id'> | null;
}
