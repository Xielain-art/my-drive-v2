import { FileRecord, UploadFileResponse } from '@my-drive-v2/shared-types';
import { apiClient } from '../../client';



export const fetchFiles = async (): Promise<FileRecord[]> => {
  const { data } = await apiClient.get<FileRecord[]>('/files');
  return data;
};

export const uploadFile = async (file: File): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.set('file', file);
  console.log(formData);
  const { data } = await apiClient.post('/files/upload', formData);
  return data;
};

