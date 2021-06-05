export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[] | [];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  description?: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}
