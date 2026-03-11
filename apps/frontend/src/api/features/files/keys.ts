import { createQueryKeys } from '@lukemorales/query-key-factory';
import { fetchFiles } from './api';

export const filesKeys = createQueryKeys('files', {
  all: null,
  list: () => ({
    queryKey: ['list'],
    queryFn: () => fetchFiles(),
  }),
});
