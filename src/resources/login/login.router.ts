import { Router, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  StatusCodes as Codes,
  ReasonPhrases as Reasons,
} from 'http-status-codes';

import { JWT_SECRET_KEY } from '../../common/config';
import User from '../users/user.model';
import CustomError from '../../common/CustomError';

export const router = Router();

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body;
      const user = await getRepository(User).findOne({ where: { login } });
      if (!user)
        throw new CustomError(Reasons.UNAUTHORIZED, Codes.UNAUTHORIZED);

      if (!bcrypt.compareSync(password, user.password))
        throw new CustomError(Reasons.FORBIDDEN, Codes.FORBIDDEN);

      const token = jwt.sign({ id: user.id, login }, JWT_SECRET_KEY as string, {
        expiresIn: 60 * 60 * 24 * 90, // 90 days
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  });
