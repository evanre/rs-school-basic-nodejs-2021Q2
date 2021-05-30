class MemoDB {
  constructor() {
    this.users = [];
    this.boards = [];
    this.tasks = [];
  }

  getAll(entityName) {
    return this[entityName];
  }

  get(entityName, id) {
    return this[entityName].find((el) => el.id === id);
  }

  getIndex(entityName, id) {
    return this[entityName].findIndex((el) => el.id === id);
  }

  create(entityName, entity) {
    const idx = this[entityName].push(entity) - 1;

    return this[entityName][idx];
  }

  update(entityName, entity) {
    const idx = this.getIndex(entityName, entity.id);
    this[entityName][idx] = entity;

    return this[entityName][idx];
  }

  remove(entityName, id) {
    const idx = this.getIndex(entityName, id);

    this[entityName].splice(idx, 1);
  }
}

export default new MemoDB();
