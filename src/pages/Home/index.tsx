import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/shared/ui';
import { useUIStore } from '@/app/store/ui-store';

// Example query that fetches from a public API (no config needed)
async function fetchRandomUser() {
  const response = await fetch('https://randomuser.me/api/');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

export function HomePage() {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['random-user'],
    queryFn: fetchRandomUser,
    enabled: false, // Don't auto-fetch on mount
  });

  const user = data?.results?.[0];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          React Web Template
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A production-ready template with React, TypeScript, Vite, and more.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/form">
            <Button>Try Form Example</Button>
          </Link>
          <Button variant="outline" onClick={() => refetch()}>
            {isLoading ? 'Loading...' : 'Fetch Random User'}
          </Button>
        </div>
      </section>

      {/* React Query Demo */}
      {(user || error) && (
        <section className="card mx-auto max-w-md">
          <h2 className="mb-4 text-lg font-semibold">React Query Demo</h2>
          {error ? (
            <p className="text-red-600">Error: {(error as Error).message}</p>
          ) : user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.picture.medium}
                alt={user.name.first}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <p className="font-medium">
                  {user.name.first} {user.name.last}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.location.country}</p>
              </div>
            </div>
          ) : null}
        </section>
      )}

      {/* Zustand Demo */}
      <section className="card mx-auto max-w-md">
        <h2 className="mb-4 text-lg font-semibold">Zustand Store Demo</h2>
        <p className="mb-4 text-sm text-gray-600">
          Current theme preference: <strong>{theme}</strong>
        </p>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <Button
              key={t}
              variant={theme === t ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTheme(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          This preference is persisted in localStorage via Zustand middleware.
        </p>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold">Included Technologies</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Vite', desc: 'Fast build tool with HMR' },
            { name: 'React 18', desc: 'UI library with concurrent features' },
            { name: 'TypeScript', desc: 'Type-safe JavaScript' },
            { name: 'React Router', desc: 'Client-side routing' },
            { name: 'TanStack Query', desc: 'Server state management' },
            { name: 'React Hook Form', desc: 'Performant form handling' },
            { name: 'Zod', desc: 'Schema validation' },
            { name: 'Zustand', desc: 'Lightweight state management' },
            { name: 'Tailwind CSS', desc: 'Utility-first styling' },
            { name: 'Axios', desc: 'HTTP client' },
            { name: 'Vitest', desc: 'Unit testing framework' },
            { name: 'ESLint + Prettier', desc: 'Code quality & formatting' },
          ].map((tech) => (
            <div key={tech.name} className="card">
              <h3 className="font-semibold text-gray-900">{tech.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
