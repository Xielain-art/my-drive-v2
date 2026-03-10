import 'multer';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';

import { S3Service } from './s3.service';
import { FileEntity } from '../file.entity';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';

@ApiTags('Файлы (S3)')
@Controller('files')
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Загрузить новый файл в облако' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @ApiCreatedResponse({
    description: 'Файл успешно загружен и сохранен в БД.',
    type: UploadFileResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Файл не был передан в запросе.' })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadFileResponseDto> {
    if (!file) {
      throw new BadRequestException('Файл не найден');
    }

    const fileUrl = await this.s3Service.uploadFile(file);

    const newFile = this.fileRepository.create({
      name: file.originalname,
      url: fileUrl,
    });

    const savedFile = await this.fileRepository.save(newFile);

    return {
      message: 'Файл успешно загружен!',
      file: savedFile
    };
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех файлов' })
  @ApiOkResponse({
    description: 'Возвращает массив файлов, отсортированных по дате (новые сверху)',
    type: [FileEntity],
  })
  async getAllFiles(): Promise<FileEntity[]> {
    return await this.fileRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
