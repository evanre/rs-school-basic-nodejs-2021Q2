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
      if (!login || !password)
        throw new CustomError(Reasons.BAD_REQUEST, Codes.BAD_REQUEST);

      const user = await getRepository(User).findOne({ where: { login } });
      if (!user)
        throw new CustomError(Reasons.UNAUTHORIZED, Codes.UNAUTHORIZED);

      if (!bcrypt.compareSync(password, user.password))
        throw new CustomError(Reasons.FORBIDDEN, Codes.FORBIDDEN);

      const token = jwt.sign({ id: user.id, login }, JWT_SECRET_KEY as string, {
        expiresIn: '24h',
      });
      res.json({ token });
    } catch (err) {
      next(new CustomError(err.message, err.statusCode || Codes.UNAUTHORIZED));
    }
  });
