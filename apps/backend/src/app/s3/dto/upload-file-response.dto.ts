import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../../file.entity';

export class UploadFileResponseDto {
  @ApiProperty({ example: 'Файл успешно загружен!' })
  message: string;

  @ApiProperty({ type: () => FileEntity })
  file: FileEntity;
}
