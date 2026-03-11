import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 border-b">
        <Link to="/" className="[&.active]:font-bold text-blue-500">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold text-blue-500">
          About
        </Link>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
