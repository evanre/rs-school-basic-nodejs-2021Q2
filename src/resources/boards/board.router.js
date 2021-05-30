import { Router } from 'express';
import Board from './board.model.js';
import boardsService from './board.service.js';

const router = Router();

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);

  if (!board) res.status(404).json('Not found');

  res.json(Board.toResponse(board));
});

router.route('/').post(async ({ body }, res) => {
  const board = await boardsService.create(Board.fromRequest(body));

  res.status(201).json(Board.toResponse(board));
});

router.route('/:id').delete(async ({ params }, res) => {
  await boardsService.remove(params.id);

  res.json('ok');
});

router.route('/:id').put(async ({ params, body }, res) => {
  const { id } = params;
  const board = Board.fromRequest({ ...body, id });
  await boardsService.update(board);

  res.json(board);
});

export default router;
