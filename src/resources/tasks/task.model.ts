import { randomUUID } from 'crypto';
import { ITask } from '../../common/types';

export default class Task {
  id: string;

  title: string;

  order: number;

  description: string | undefined;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = randomUUID(),
    title = id,
    order = NaN,
    description = '',
    userId,
    boardId,
    columnId,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Filters which data should be sent to response from User instance
   * @param {Object} data — the task object
   * @returns {Object} - Object with filtered properties.
   */
  static toResponse(data: ITask) {
    return data;
  }

  /**
   * Handles data from request and aligns it according to Task's model
   * @param {Object} data — Passed task object
   * @returns {Object} - Aligned Task instance.
   */
  static fromRequest(data: ITask) {
    return new Task(data);
  }
}
