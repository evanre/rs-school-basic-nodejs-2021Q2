import { Column as Col, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IColumn } from '../common/interfaces';

@Entity({ name: 'column' })
export default class Column implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Col('varchar', { length: 40 })
  title!: string;

  @Col('smallint')
  order!: number;
}
