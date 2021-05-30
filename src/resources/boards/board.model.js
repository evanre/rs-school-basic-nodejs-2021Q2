import { randomUUID } from 'crypto';

export default class Board {
  constructor({ id = randomUUID(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(data) {
    return data;
  }

  static fromRequest(data) {
    return new Board(data);
  }

  static toDb(data) {
    return data;
  }
}
