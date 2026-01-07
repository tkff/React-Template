import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import { queryClient } from './providers/query-client';
import { AppRoutes } from './routes';
import { ErrorFallback } from '@/shared/ui';

export function App() {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <ErrorFallback error={error instanceof Error ? error : undefined} resetError={resetError} />
      )}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
