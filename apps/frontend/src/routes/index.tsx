import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@my-drive-v2/ui';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3 className="text-2xl font-bold mb-4">Welcome Home!</h3>
      <Button>Наша кнопка из Nx Lib!</Button>
    </div>
  );
}
