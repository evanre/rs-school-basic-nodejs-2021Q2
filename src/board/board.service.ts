import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Board } from './board.entity';
import { IBoard } from './board.interfaces';
import { BoardDto } from './board.dtos';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async saveBoard(boardDto: BoardDto): Promise<IBoard> {
    return await this.boardRepository.save(boardDto);
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async getBoard(id: string): Promise<Board | undefined> {
    return await this.boardRepository.findOne(id);
  }

  async removeBoard(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
