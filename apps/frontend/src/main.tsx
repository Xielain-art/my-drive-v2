import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'; // <--- Добавили useKeycloak
import Keycloak from 'keycloak-js';

import './styles.css';
import { routeTree } from './routeTree.gen';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'my-drive',
  clientId: 'my-drive-front',
});

const handleTokens = (tokens: any) => {
  if (tokens.token) {
    localStorage.setItem('kc_token', tokens.token);
  } else {
    localStorage.removeItem('kc_token');
  }
};

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const AppRouter = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600">Авторизация...</h1>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: 'login-required' }}
        onTokens={handleTokens}
      >
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ReactKeycloakProvider>
    </StrictMode>,
  );
}
