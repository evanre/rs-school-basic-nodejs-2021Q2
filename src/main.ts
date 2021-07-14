import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PORT, USE_FASTIFY } from './configure.root';
import { ValidationPipe } from './common/validation.pipe';
import { uncaughtExceptionHandler } from './common/uncaughtExceptionHandler';

process.on('uncaughtException', uncaughtExceptionHandler);

(async () => {
  const isFastify = USE_FASTIFY === 'true';
  const framework = isFastify ? 'Fastify' : 'Express';

  const app = isFastify
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
      )
    : await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('RS.School Node.js')
    .setDescription('RS.School Node.js 2021Q2 Course')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT || 4000, '0.0.0.0', () => {
    console.log(`Nest.js (${framework}) application started on port: ${PORT}`);
  });
})();
