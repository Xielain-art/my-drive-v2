import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import type {IFile} from '@my-drive-v2/shared-types'

@Entity('files')
export class FileEntity implements IFile {
  // <-- Указываем implements IFile
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;
}
