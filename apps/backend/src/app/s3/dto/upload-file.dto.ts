import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { UploadFileSchema } from '@my-drive-v2/shared-types';

export class UploadFileDto extends createZodDto(UploadFileSchema) {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Файл для загрузки',
  })
  file: Express.Multer.File;
}
