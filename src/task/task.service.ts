import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { ITask } from './task.interfaces';
import { TaskDto } from './task.dtos';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async save(boardId, taskDto: TaskDto): Promise<ITask> {
    return await this.taskRepository.save({ ...taskDto, boardId });
  }

  async getAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async nullUsersTasks(id: string): Promise<void> {
    const tasks = await this.taskRepository.find({ where: { userId: id } });
    for await (const task of tasks) {
      await this.taskRepository.save({ ...task, userId: null });
    }
  }

  async get(value: string, param = 'id'): Promise<Task | undefined> {
    return await this.taskRepository.findOne({ where: { [param]: value } });
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
