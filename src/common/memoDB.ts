import { IUser, IBoard, ITask } from './types';

interface Entity {
  id: string;
}

class MemoDB<T extends Entity> {
  list: Array<T>;

  constructor() {
    this.list = [];
  }

  /**
   * Returns the list of all entities
   * @returns {Array<T>} - List of entities
   */
  getAll(): Array<T> {
    return this.list;
  }

  /**
   * Returns the entity by given id
   * @param {String} id - entity's identifier
   * @returns {Object | undefined} - entity's information
   */
  get(id: string): T | undefined {
    return this.getAll().find((el: T) => el.id === id);
  }

  /**
   * Returns the entity's index by given id
   * @param {String} id - entity's identifier
   * @returns {Number} - entity's index
   */
  getIndex(id: string): number {
    return this.getAll().findIndex((el: T) => el.id === id);
  }

  /**
   * Creates the entity by given signature
   * @param {Object} entity - entity's identifier
   * @returns {Object} - entity's information
   */
  create(entity: T) {
    const idx = this.getAll().push(entity) - 1;

    return this.getAll()[idx];
  }

  /**
   * Updates the entity by given signature
   * @param {Object} entity - entity's identifier
   * @returns {Object} - entity's information
   */
  update(entity: T) {
    const idx = this.getIndex(entity.id);
    this.getAll()[idx] = entity;

    return this.getAll()[idx];
  }

  /**
   * Removes the entity by given type, and it's id
   * @param {String} id - entity's identifier
   * @returns {void} - Nothing
   */
  remove(id: string) {
    const idx = this.getIndex(id);

    this.getAll().splice(idx, 1);
  }
}

export const usersDB = new MemoDB<IUser>();
export const tasksDB = new MemoDB<ITask>();
export const boardsDB = new MemoDB<IBoard>();