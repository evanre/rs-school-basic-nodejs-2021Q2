import { randomUUID as uuid } from 'crypto';
import { IBoard, IColumn } from '../../common/types';

export default class Board {
  id: string;

  title: string;

  columns: IColumn[];

  constructor({ id = uuid(), title = 'TITLE', columns = [] }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Filters which data should be sent to response from Board instance
   * @param {Object} data — the board object
   * @returns {Object} - Object with filtered properties.
   */
  static toResponse(data: IBoard) {
    return data;
  }

  /**
   * Handles data from request and aligns it according to Board's model
   * @param {Object} data — Passed board object
   * @returns {Object} - Aligned Board instance.
   */
  static fromRequest(data: IBoard) {
    return new Board(data);
  }
}
