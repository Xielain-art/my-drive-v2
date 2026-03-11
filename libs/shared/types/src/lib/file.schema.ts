import { z } from 'zod';

export const FileSchema = z.object({
  id: z.number().optional().describe('ID файла в БД'),
  name: z.string().describe('Оригинальное имя файла'),
  url: z.string().url().describe('Прямая ссылка на файл в S3'),

  createdAt: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.string().datetime()
  ).optional().describe('Дата создания (ISO строка)'),
});

export const UploadFileResponseSchema = z.object({
  message: z.string().describe('Статус загрузки'),
  file: FileSchema.describe('Сохраненная сущность файла'),
});

export const UploadFileSchema = z.object({
  file: z.any().describe('Бинарный файл'),
});

export type FileRecord = z.infer<typeof FileSchema>;
export type UploadFileResponse = z.infer<typeof UploadFileResponseSchema>;
export type UploadFileRequest = z.infer<typeof UploadFileSchema>;
