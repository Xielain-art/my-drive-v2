import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { todosKeys } from './features/todos/keys';
import { filesKeys } from './features/files/keys';

export const queries = mergeQueryKeys(todosKeys, filesKeys);
