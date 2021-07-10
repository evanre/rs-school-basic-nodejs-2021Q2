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

import { BoardDto, BoardIdDto } from './board.dtos';
import { BoardService } from './board.service';
import { Board } from './board.entity';

@Controller('boards')
@ApiTags('Boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: HttpStatus.OK, type: Board })
  @Post()
  save(@Body() boardDto: BoardDto) {
    return this.boardService.save(boardDto);
  }

  @ApiOperation({ summary: 'Update a board by id' })
  @ApiResponse({ status: HttpStatus.OK, type: Board })
  @Put(':id')
  update(@Param() { id }: BoardIdDto, @Body() boardDto: BoardDto) {
    return this.boardService.save({ ...boardDto, id });
  }

  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: HttpStatus.OK, type: [Board] })
  @Get()
  getAll() {
    return this.boardService.getAll();
  }

  @ApiOperation({ summary: 'Get a single board' })
  @ApiResponse({ status: HttpStatus.OK, type: Board })
  @Get(':id')
  async get(@Param() { id }: BoardIdDto) {
    const board = await this.boardService.get(id);

    if (!board) {
      throw new NotFoundException();
    }

    return board;
  }

  @ApiOperation({ summary: 'Remove board' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  async remove(@Param() { id }: BoardIdDto) {
    const board = await this.boardService.get(id);

    if (!board) {
      throw new NotFoundException();
    }
    return this.boardService.remove(id);
  }
}
