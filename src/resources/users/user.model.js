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

  static toResponse(data) {
    return data;
  }

  static fromRequest(data) {
    return new User(data);
  }

  static toDb(data) {
    return data;
  }
}

module.exports = User;
