import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskDto, TaskIdDto } from './task.dtos';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('boards/:boardId/tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Post()
  save(@Param() { boardId }, @Body() taskDto: TaskDto) {
    return this.taskService.save(boardId, taskDto);
  }

  @ApiOperation({ summary: 'Update a task by id' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Put(':id')
  update(@Param() { id, boardId }, @Body() taskDto: TaskDto) {
    return this.taskService.save(boardId, { ...taskDto, id });
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: HttpStatus.OK, type: [Task] })
  @Get()
  getAll() {
    return this.taskService.getAll();
  }

  @ApiOperation({ summary: 'Get a single task' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Get(':id')
  async get(@Param() { id }: TaskIdDto) {
    const task = await this.taskService.get(id);

    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @ApiOperation({ summary: 'Remove task' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  async remove(@Param() { id }: TaskIdDto) {
    const task = await this.taskService.get(id);

    if (!task) {
      throw new NotFoundException();
    }
    return this.taskService.remove(id);
  }
}
