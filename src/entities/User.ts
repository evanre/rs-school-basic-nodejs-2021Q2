import { Column as Col, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../common/interfaces';

@Entity({ name: 'user' })
export default class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Col('varchar', { length: 50 })
  public name!: string;

  @Col('varchar', { length: 50 })
  public login!: string;

  @Col('varchar', { length: 60 })
  public password!: string;
}
