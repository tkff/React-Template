import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib';
import { LanguageSwitcher } from '@/shared/ui/components/LanguageSwitcher';

export function MainLayout() {
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/form', label: t('nav.form') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold text-primary-600">
                {t('common.appName')}
              </Link>
              <nav className="hidden md:flex md:gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      location.pathname === link.to
                        ? 'text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            {t('common.appName')} — {t('footer.builtWith')}
          </p>
        </div>
      </footer>
    </div>
  );
}
