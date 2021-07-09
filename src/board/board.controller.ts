import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BoardDto, BoardIdDto } from './board.dtos';
import { BoardService } from './board.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './board.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('boards')
@UseGuards(JwtAuthGuard)
@ApiTags('Boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: 200, type: Board })
  @Post()
  save(@Body() boardDto: BoardDto) {
    return this.boardService.saveBoard(boardDto);
  }

  @ApiOperation({ summary: 'Update a board by id' })
  @ApiResponse({ status: 200, type: Board })
  @Put(':id')
  update(@Param() { id }: BoardIdDto, @Body() boardDto: BoardDto) {
    return this.boardService.saveBoard({ ...boardDto, id });
  }

  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: 200, type: [Board] })
  @Get()
  getAll() {
    return this.boardService.getAllBoards();
  }

  @ApiOperation({ summary: 'Get a single board' })
  @ApiResponse({ status: 200, type: Board })
  @Get(':id')
  get(@Param() { id }: BoardIdDto) {
    return this.boardService.getBoard(id);
  }
}
