import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-900">{t('notFound.title')}</h1>
      <p className="mt-4 text-xl text-gray-600">{t('notFound.message')}</p>
      <p className="mt-2 text-gray-500">{t('notFound.description')}</p>
      <Link to="/" className="mt-8">
        <Button>{t('notFound.backHome')}</Button>
      </Link>
    </div>
  );
}
