import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PORT } from './configure.root';
import { ValidationPipe } from './common/validation.pipe';

async function start() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(PORT || 4000, () =>
    console.log(`Server started on port: ${PORT}`),
  );
}

start();
