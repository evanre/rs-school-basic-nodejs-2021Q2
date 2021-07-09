import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configModule, ormConfig } from './configure.root';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
