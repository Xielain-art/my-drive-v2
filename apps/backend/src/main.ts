import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  cleanupOpenApiDoc
} from 'nestjs-zod';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // разрешает все запросы
  //
  // app.useGlobalPipes(new ZodValidationPipe());
  // app.useGlobalInterceptors(new ZodSerializerInterceptor());

  const config = new DocumentBuilder()
    .setTitle('My Drive API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(`🚀 Бэкенд успешно запущен на: http://localhost:${port}`);
  Logger.log(`📚 Swagger документация доступна по адресу: http://localhost:${port}/api`);
}
bootstrap();
