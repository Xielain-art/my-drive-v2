import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service implements OnModuleInit {
  private readonly s3Client: S3Client;
  private readonly bucketName = 'my-drive-files';
  private readonly logger = new Logger(S3Service.name);

  constructor() {
    this.s3Client = new S3Client({
      region: 'us-east-1',
      endpoint: `http://localhost:${process.env.MINIO_API_PORT || 9000}`,
      credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER || 'minioadmin',
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD || 'minio_secret_password',
      },
      forcePathStyle: true,
    });
  }

  onModuleInit() {
    this.logger.log('☁️ S3 Service готов к работе с MinIO');
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);
      return `http://localhost:${process.env.MINIO_API_PORT || 9000}/${this.bucketName}/${uniqueFileName}`;
    } catch (error: any) {
      this.logger.error(`Ошибка загрузки: ${error.message}`);
      throw error;
    }
  }
}
