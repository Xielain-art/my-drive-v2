import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { todosKeys } from './features/todos/keys';

export const queries = mergeQueryKeys(todosKeys);
