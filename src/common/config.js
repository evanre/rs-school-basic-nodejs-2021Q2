import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config({
  path: path.join(dirname(fileURLToPath(import.meta.url)), '../../.env'),
});

export const { AUTH_MODE } = process.env.AUTH_MODE === 'true';

export const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
} = process.env;
