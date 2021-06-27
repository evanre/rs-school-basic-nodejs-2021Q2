import { PrimaryGeneratedColumn } from 'typeorm';
import { randomUUID } from 'crypto';
import { IEntity } from './interfaces';

export default class Particle implements IEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  constructor({ id = randomUUID() }) {
    this.id = id;
  }

  public static toResponse(data: Particle): Partial<Particle> {
    return data;
  }

  public static fromRequest(data: Partial<Particle>): Partial<Particle> {
    return new this(data);
  }
}
