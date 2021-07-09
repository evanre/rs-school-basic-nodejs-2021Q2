import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';

export const configModule = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
});

export const { JWT_SECRET, PORT } = process.env;

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;
// todo: replace POSTGRES_HOST when setup docker for nodejs
const POSTGRES_HOST = 'localhost';

export const ormConfig = {
  type: 'postgres',
  host: POSTGRES_HOST, // postgres container name
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User],
  // migrations: ['src/migrations/*.ts'],
  // synchronize: false,
  synchronize: true,
  // migrationsRun: true,
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
} as TypeOrmModuleOptions;
