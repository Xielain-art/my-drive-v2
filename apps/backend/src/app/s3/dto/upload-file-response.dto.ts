import { createZodDto } from 'nestjs-zod';
import { UploadFileResponseSchema } from '@my-drive-v2/shared-types'; // твой импорт из shared lib

export class UploadFileResponseDto extends createZodDto(UploadFileResponseSchema) {}
