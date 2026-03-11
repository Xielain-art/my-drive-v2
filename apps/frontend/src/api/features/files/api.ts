import { FileRecord } from '@my-drive-v2/shared-types';
import { apiClient } from '../../client';



export const fetchFiles = async (): Promise<FileRecord[]> => {
  const { data } = await apiClient.get<FileRecord[]>('/files');
  return data;
};

// export const fetchTodoById = async (id: string | number): Promise<Todo> => {
//   const { data } = await apiClient.get<Todo>(`/todos/${id}`);
//   return data;
// };
