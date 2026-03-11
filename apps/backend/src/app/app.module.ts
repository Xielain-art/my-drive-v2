import 'dotenv/config';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import {
  ZodValidationPipe,
  ZodSerializerInterceptor,
} from 'nestjs-zod';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileEntity } from './file.entity';
import { S3Module } from './s3/s3.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [FileEntity],
      synchronize: true,
    }),
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },],
})
export class AppModule {}
