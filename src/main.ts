import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.setGlobalPrefix('v1');

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('VocaTrain Backend')
    .setDescription('The VocaTrain API description.')
    .setVersion('1.0.0')
    .build()));

  await app.listen(3500);
}
bootstrap();
