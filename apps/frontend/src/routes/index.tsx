import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@my-drive-v2/ui';
import { queries } from '../api';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    ...queries.todos.list(2),
  });

  const handleInvalidate = () => {
    queryClient.invalidateQueries({
      queryKey: queries.todos._def,
    });
  };

  if (isPending) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-2">
      <h3 className="text-2xl font-bold mb-4">
        Данные с сервера (через Query Key Factory):
      </h3>

      <ul className="mb-6 space-y-2">
        {data.map((todo: any) => (
          <li key={todo.id} className="p-2 border rounded shadow-sm">
            {todo.title}
          </li>
        ))}
      </ul>

      <Button onClick={handleInvalidate}>Сбросить кэш (Invalidate)</Button>
    </div>
  );
}
