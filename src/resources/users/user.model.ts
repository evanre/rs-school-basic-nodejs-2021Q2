import bcrypt from 'bcrypt';
import { randomUUID as uuid } from 'crypto';
import { IUser } from '../../common/types';

export default class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * @constructor
   * @param {Id} [id] User id
   * @param {string} [name="USER"] User name
   * @param {string} [login="user"] User login
   * @param {string} [password="P@55w0rd"] User password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = bcrypt.hashSync(password, 10);
  }

  /**
   * Filters which data should be sent to response from User instance
   * @param {Object} User — the user object
   * @returns {Object} - Object with filtered properties.
   */
  static toResponse({ id, name, login }: IUser) {
    return { id, name, login };
  }

  /**
   * Handles data from request and aligns it according to User's model
   * @param {Object} data — Passed user object
   * @returns {Object} - Aligned User instance.
   */
  static fromRequest(data: IUser) {
    return new User(data);
  }
}
