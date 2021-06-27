import { Column as Col, Entity } from 'typeorm';
import { IBoard } from '../../common/interfaces';
import Particle from '../../common/Particle';

@Entity()
export default class Board extends Particle implements IBoard {
  @Col('varchar')
  title!: string;

  @Col('jsonb', { nullable: true })
  columns!: [];

  constructor({ id, title = 'title', columns = [] }: Partial<IBoard> = {}) {
    super({ id });

    this.title = title;
    this.columns = columns;
  }
}
