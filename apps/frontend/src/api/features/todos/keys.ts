import { createQueryKeys } from '@lukemorales/query-key-factory';
import { fetchTodos, fetchTodoById } from './api';

export const todosKeys = createQueryKeys('todos', {
  all: null,
  list: (limit: number = 5) => ({
    queryKey: [{ limit }],
    queryFn: () => fetchTodos(limit),
  }),
  detail: (id: string | number) => ({
    queryKey: [id],
    queryFn: () => fetchTodoById(id),
  }),
});
