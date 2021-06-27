import { Router } from 'express';
import Repo from '../../common/repository';
import Board from './board.model';

const boardsRepo = new Repo(Board);

export const router = Router();

router.route('/').get(boardsRepo.getAll).post(boardsRepo.save);

router
  .route('/:id')
  .get(boardsRepo.get)
  .put(boardsRepo.save)
  .delete(boardsRepo.delete);
