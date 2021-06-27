import { Router } from 'express';
import Repo from '../../common/repository';
import User from './user.model';

const usersRepo = new Repo(User);

export const router = Router();

router.route('/').get(usersRepo.getAll).post(usersRepo.save);

router
  .route('/:id')
  .get(usersRepo.get)
  .put(usersRepo.save)
  .delete(usersRepo.delete);
