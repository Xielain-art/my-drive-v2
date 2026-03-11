import { apiClient } from '../../client';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (limit: number): Promise<Todo[]> => {
  const { data } = await apiClient.get<Todo[]>('/todos', {
    params: { _limit: limit },
  });
  return data;
};

export const fetchTodoById = async (id: string | number): Promise<Todo> => {
  const { data } = await apiClient.get<Todo>(`/todos/${id}`);
  return data;
};
