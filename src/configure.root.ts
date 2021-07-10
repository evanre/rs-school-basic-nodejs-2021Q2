import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

export const configModule = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
});

export const { JWT_SECRET, PORT, OPEN_ENDPOINTS } = process.env;

const {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;
// todo: replace POSTGRES_HOST when setup docker for nodejs
const POSTGRES_HOST = 'localhost';

export default {
  type: 'postgres',
  host: POSTGRES_HOST, // postgres container name
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
} as TypeOrmModuleOptions;
