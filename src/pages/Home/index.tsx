import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui';
import { useUIStore } from '@/app/store/ui-store';

// Example query that fetches from a public API (no config needed)
async function fetchRandomUser() {
  const response = await fetch('https://randomuser.me/api/');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

export function HomePage() {
  const { t } = useTranslation();
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['random-user'],
    queryFn: fetchRandomUser,
    enabled: false, // Don't auto-fetch on mount
  });

  const user = data?.results?.[0];

  const technologies = [
    { name: 'Vite', desc: t('tech.vite') },
    { name: 'React 18', desc: t('tech.react') },
    { name: 'TypeScript', desc: t('tech.typescript') },
    { name: 'React Router', desc: t('tech.router') },
    { name: 'TanStack Query', desc: t('tech.query') },
    { name: 'React Hook Form', desc: t('tech.hookForm') },
    { name: 'Zod', desc: t('tech.zod') },
    { name: 'Zustand', desc: t('tech.zustand') },
    { name: 'Tailwind CSS', desc: t('tech.tailwind') },
    { name: 'Axios', desc: t('tech.axios') },
    { name: 'Vitest', desc: t('tech.vitest') },
    { name: 'ESLint + Prettier', desc: t('tech.eslint') },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('home.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{t('home.subtitle')}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/form">
            <Button>{t('home.tryForm')}</Button>
          </Link>
          <Button variant="outline" onClick={() => refetch()}>
            {isLoading ? t('common.loading') : t('home.fetchUser')}
          </Button>
        </div>
      </section>

      {/* React Query Demo */}
      {(user || error) && (
        <section className="card mx-auto max-w-md">
          <h2 className="mb-4 text-lg font-semibold">{t('home.queryDemo')}</h2>
          {error ? (
            <p className="text-red-600">
              {t('common.error')}: {(error as Error).message}
            </p>
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
        <h2 className="mb-4 text-lg font-semibold">{t('home.storeDemo')}</h2>
        <p className="mb-4 text-sm text-gray-600">
          {t('home.currentTheme')} <strong>{t(`home.${theme}`)}</strong>
        </p>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map((themeOption) => (
            <Button
              key={themeOption}
              variant={theme === themeOption ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTheme(themeOption)}
            >
              {t(`home.${themeOption}`)}
            </Button>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">{t('home.themePersisted')}</p>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold">{t('home.technologies')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
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
