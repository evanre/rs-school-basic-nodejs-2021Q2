import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Board from './board.model';
import boardsService from './board.service';

const router = Router();

router.route('/').get(async (_: Request, res: Response) => {
  const boards = await boardsService.getAll();
  res.status(StatusCodes.OK).json(boards.map(Board.toResponse));
});

router.route('/:id').get(async ({ params }: Request, res: Response) => {
  const board = await boardsService.get(params['id'] || '');
  if (board) {
    res.json(Board.toResponse(board));
  } else {
    res.status(StatusCodes.NOT_FOUND).json('Not found');
  }
});

router.route('/').post(async ({ body }: Request, res: Response) => {
  const board = await boardsService.create(Board.fromRequest(body));

  if (board) {
    res.status(StatusCodes.CREATED).json(Board.toResponse(board));
  } else {
    res.status(StatusCodes.NOT_FOUND).json('Not found');
  }
});

router.route('/:id').delete(async ({ params }: Request, res: Response) => {
  await boardsService.remove(params['id'] || '');

  res.status(StatusCodes.OK).json('ok');
});

router.route('/:id').put(async ({ params, body }: Request, res: Response) => {
  const { id } = params;
  const board = Board.fromRequest({ ...body, id });
  await boardsService.update(board);

  res.status(StatusCodes.OK).json(board);
});

export default router;
