import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('files')
export class FileEntity {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'vacation.jpg', description: 'Оригинальное имя файла' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'http://localhost:9000/my-drive-files/uuid-file.jpg',
    description: 'Путь к файлу в хранилище'
  })
  @Column()
  url: string;

  @ApiProperty({ example: '2026-03-10T12:00:00Z', description: 'Дата загрузки' })
  @CreateDateColumn()
  createdAt: Date;
}
