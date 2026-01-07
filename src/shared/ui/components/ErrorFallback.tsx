import { useTranslation } from 'react-i18next';
import { Button } from './Button';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

/**
 * Fallback UI shown when an error boundary catches an error
 */
export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-red-100 p-4">
        <svg
          className="h-12 w-12 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-gray-900">{t('error.title', 'Oops!')}</h1>

      <p className="mt-2 max-w-md text-gray-600">
        {t('error.message', 'Something went wrong. Please try again.')}
      </p>

      {import.meta.env.DEV && error && (
        <details className="mt-4 w-full max-w-lg text-left">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
            {t('error.details', 'Error details')}
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-gray-100 p-4 text-xs text-red-600">
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}

      <div className="mt-6 flex gap-4">
        {resetError && (
          <Button onClick={resetError} variant="primary">
            {t('error.tryAgain', 'Try again')}
          </Button>
        )}
        <Button onClick={() => (window.location.href = '/')} variant="secondary">
          {t('error.goHome', 'Go to homepage')}
        </Button>
      </div>
    </div>
  );
}
