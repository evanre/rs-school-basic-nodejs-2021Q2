import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '..', '..', '.env'),
});

export const { PORT } = process.env;

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export default {
  type: 'postgres',
  host: DB_HOST, // postgres container name
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [`./src/resources/**/*.model{.ts,.js}`],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;
