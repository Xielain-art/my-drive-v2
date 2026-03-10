import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('My Drive API')
    .setDescription('Документация для нашего облачного диска (S3 + Postgres)')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Бэкенд запущен: http://localhost:${port}/${globalPrefix}`);
  console.log(`📚 Swagger UI доступен по адресу: http://localhost:${port}/api/docs`);
}

bootstrap();
