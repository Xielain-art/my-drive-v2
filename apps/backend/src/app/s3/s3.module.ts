import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { FileEntity } from '../file.entity'; // Путь к сущности

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
