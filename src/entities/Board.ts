import { Column as Col, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard, IColumn } from '../common/interfaces';

@Entity({ name: 'board' })
export default class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Col('varchar', { length: 40 })
  title!: string;

  @Col('simple-json')
  columns!: IColumn[];
}
