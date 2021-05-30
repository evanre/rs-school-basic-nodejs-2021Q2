import { randomUUID } from 'crypto';

export default class Task {
  constructor({
    id = randomUUID(),
    title = id,
    order = NaN,
    description = '',
    userId,
    boardId,
    columnId,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(data) {
    return data;
  }

  static fromRequest(data) {
    return new Task(data);
  }

  static toDb(data) {
    return data;
  }
}
