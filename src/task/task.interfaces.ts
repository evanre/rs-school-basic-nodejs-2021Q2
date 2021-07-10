import { IUser } from '../user/user.interfaces';
import { IBoard } from '../board/board.interfaces';
import { IColumn } from '../common/interfaces';

export interface ITask {
  id: string;
  title: string;
  order?: number | null;
  userId: Pick<IUser, 'id'> | null;
  boardId: Pick<IBoard, 'id'>;
  columnId: Pick<IColumn, 'id'> | null;
  description?: string;
}
