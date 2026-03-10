import 'multer';

import { Controller, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from './s3.service';
import { FileEntity } from '../file.entity';

@Controller('files')
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'Файл не найден' };
    }

    const fileUrl = await this.s3Service.uploadFile(file);

    const newFile = this.fileRepository.create({
      name: file.originalname,
      url: fileUrl,
    });

    const savedFile = await this.fileRepository.save(newFile);

    return {
      message: 'Файл успешно загружен!',
      file: savedFile,
    };
  }

  @Get()
  async getAllFiles() {
    return await this.fileRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
