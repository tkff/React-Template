import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '@/app/i18n';
import { cn } from '@/shared/lib';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'buttons';
  className?: string;
}

export function LanguageSwitcher({ variant = 'buttons', className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  if (variant === 'dropdown') {
    return (
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className={cn(
          'rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          className
        )}
        aria-label="Select language"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className={cn('flex gap-1', className)}>
      {supportedLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={cn(
            'rounded-md px-2 py-1 text-sm font-medium transition-colors',
            i18n.language === lang.code || i18n.language.startsWith(lang.code + '-')
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:bg-gray-100'
          )}
          aria-label={`Switch to ${lang.name}`}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
