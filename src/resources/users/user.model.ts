import { Column as Col, Entity } from 'typeorm';
import bcrypt from 'bcrypt';
import { IUser } from '../../common/interfaces';
import Particle from '../../common/Particle';

@Entity()
export default class User extends Particle implements IUser {
  @Col('varchar')
  public name!: string;

  @Col('varchar')
  public login!: string;

  @Col('varchar')
  public password!: string;

  constructor({
    id,
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: Partial<IUser> = {}) {
    super({ id });

    this.name = name;
    this.login = login;
    this.password = bcrypt.hashSync(password, 10);
  }

  public static toResponse({ id, name, login }: Omit<IUser, 'password'>) {
    return { id, name, login };
  }
}
