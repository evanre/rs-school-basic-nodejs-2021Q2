import { Column as Col, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { IUser, IBoard, IColumn, ITask } from '../../common/interfaces';
import Particle from '../../common/Particle';

@Entity()
export default class Task extends Particle implements ITask {
  @Col('varchar')
  title!: string;

  @Col('smallint')
  order!: number;

  @Col('varchar')
  description!: string;

  @ManyToOne('User', 'id', {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  @Col('varchar', { nullable: true })
  userId!: Pick<IUser, 'id'> | null;

  @ManyToOne('Board', 'id', {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  @Col('varchar', { nullable: true })
  boardId!: Pick<IBoard, 'id'> | null;

  @Col('varchar', { nullable: true })
  columnId!: Pick<IColumn, 'id'> | null;

  constructor({
    id,
    title = 'title',
    order = NaN,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  }: Partial<ITask> = {}) {
    super({ id });

    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
