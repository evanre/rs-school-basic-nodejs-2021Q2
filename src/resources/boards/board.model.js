import { randomUUID } from 'crypto';

export default class Board {
  constructor({ id = randomUUID(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Filters which data should be sent to response from Board instance
   * @param {Object} data — the board object
   * @returns {Object} - Object with filtered properties.
   */
  static toResponse(data) {
    return data;
  }

  /**
   * Handles data from request and aligns it according to Board's model
   * @param {Object} data — Passed board object
   * @returns {Object} - Aligned Board instance.
   */
  static fromRequest(data) {
    return new Board(data);
  }
}
