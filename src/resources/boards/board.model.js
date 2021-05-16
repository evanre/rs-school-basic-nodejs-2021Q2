const { randomUUID: uuid } = require('crypto');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = [] } = {}) {
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

module.exports = Board;
