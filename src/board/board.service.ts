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

  async save(boardDto: BoardDto): Promise<IBoard> {
    return await this.boardRepository.save(boardDto);
  }

  async getAll(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async get(value: string, param = 'id'): Promise<Board | undefined> {
    return await this.boardRepository.findOne({ where: { [param]: value } });
  }

  async remove(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
