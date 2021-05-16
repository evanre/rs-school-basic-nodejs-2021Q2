const { randomUUID: uuid } = require('crypto');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse({ id, name, login }) {
    return { id, name, login };
  }

  static fromRequest(data) {
    return new User(data);
  }

  static toDb({ id, name, login, password }) {
    return { id, name, login, password };
  }
}

module.exports = User;
