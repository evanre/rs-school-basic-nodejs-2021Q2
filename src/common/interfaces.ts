export interface IEntity {
  id: string;
  title: string;
}

export interface IColumn extends IEntity {
  order: number;
}

export interface IBoard extends IEntity {
  columns: IColumn[] | [];
}

export interface ITask extends IEntity {
  order: number;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  description?: string;
}

export interface IUser extends Omit<IEntity, 'title'> {
  name: string;
  login: string;
  password: string;
}
