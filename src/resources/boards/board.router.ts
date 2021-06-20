import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Board from './board.model';
import boardsService from './board.service';

const router = Router();
const { OK, CREATED, NOT_FOUND, NO_CONTENT } = StatusCodes;

router
  .route('/')

  .get(async (_: Request, res: Response) => {
    const boards = await boardsService.getAll();
    res.status(OK).json(boards.map(Board.toResponse));
  })

  .post(async ({ body }: Request, res: Response) => {
    const board = await boardsService.create(Board.fromRequest(body));

    if (board) {
      res.status(CREATED).json(Board.toResponse(board));
    } else {
      res.status(NOT_FOUND).json('Not found');
    }
  });

router
  .route('/:id')

  .get(async ({ params }: Request, res: Response) => {
    const { id = '' } = params;
    const board = await boardsService.get(id);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res.status(NOT_FOUND).json('Not found');
    }
  })

  .put(async ({ params, body }: Request, res: Response) => {
    const { id } = params;
    const board = Board.fromRequest({ ...body, id });
    await boardsService.update(board);

    res.status(OK).json(board);
  })

  .delete(async ({ params }: Request, res: Response) => {
    const { id = '' } = params;
    await boardsService.remove(id);

    res.status(NO_CONTENT).send({ message: 'DELETED' });
  });

export default router;
