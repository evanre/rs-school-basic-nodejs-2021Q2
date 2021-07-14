import { IColumn } from '../common/interfaces';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}
