import express from 'express';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import {
  requestResponse,
  uncaughtExceptionHandler,
  errorHandler,
  unhandledRejectionHandler,
  wrongRouteHandler,
} from './common/middlewares';

export const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(requestResponse);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('*', wrongRouteHandler);

app.use(errorHandler);

process
  .on('unhandledRejection', unhandledRejectionHandler)
  .on('uncaughtException', uncaughtExceptionHandler);
