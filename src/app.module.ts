import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import ormConfig, { configModule } from './configure.root';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { AuthGuard } from './auth/auth.guard';
import { HttpExceptionFilter } from './common/exception.filter';
import { LoggingInterceptor } from './common/logger.interceptor';

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UserModule,
    BoardModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
