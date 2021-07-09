import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configModule, ormConfig } from './configure.root';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UserModule,
    BoardModule,
  ],
})
export class AppModule {}
