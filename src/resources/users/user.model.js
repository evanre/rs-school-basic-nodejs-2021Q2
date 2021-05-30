import { randomUUID } from 'crypto';

export default class User {
  constructor({
    id = randomUUID(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Filters which data should be sent to response from User instance
   * @param {Object} User — the user object
   * @returns {Object} - Object with filtered properties.
   */
  static toResponse({ id, name, login }) {
    return { id, name, login };
  }

  /**
   * Handles data from request and aligns it according to User's model
   * @param {Object} data — Passed user object
   * @returns {Object} - Aligned User instance.
   */
  static fromRequest(data) {
    return new User(data);
  }
}
