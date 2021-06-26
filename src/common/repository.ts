import { getRepository, EntityTarget, DeleteResult } from 'typeorm';

export default class Repo<T> {
  entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  /**
   * Returns the list of all entities
   * @returns {Array} - List of entities
   */
  getAll(conditions?: object): Promise<T[]> {
    return getRepository(this.entity).find(conditions);
  }

  /**
   * Returns the entity by given id
   * @param {string} id - entity's identifier
   * @returns {object | undefined} - entity's information
   */
  get(id: string): Promise<T | undefined> {
    return getRepository(this.entity).findOne(id);
  }

  /**
   * Updates or Creates the entity by given signature
   * @param {object} entity - entity's identifier
   * @returns {object} - entity's information
   */
  async update(entity: T) {
    return getRepository(this.entity).save(entity);
  }

  /**
   * Removes the entity by given type, and it's id
   * @param {string} id - entity's identifier
   * @returns {void} - Nothing
   */
  remove(id: string): Promise<DeleteResult> {
    return getRepository(this.entity).delete(id);
  }
}
