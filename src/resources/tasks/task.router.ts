import { Router } from 'express';
import Repo from '../../common/repository';
import Task from './task.model';

const tasksRepo = new Repo(Task);

export const router = Router({ mergeParams: true });

router.route('/').get(tasksRepo.getAll).post(tasksRepo.save);

router
  .route('/:id')
  .get(tasksRepo.get)
  .put(tasksRepo.save)
  .delete(tasksRepo.delete);
