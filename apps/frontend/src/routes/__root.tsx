import { AppSidebar } from '@/apps/frontend/src/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@my-drive-v2/ui';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <AppSidebar/>
      <main>
        <SidebarTrigger />
        <div className="p-4">
          <Outlet />
        </div>
      </main>

      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </SidebarProvider>
  ),
});
