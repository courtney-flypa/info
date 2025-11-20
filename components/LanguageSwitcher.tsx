'use client';

import { useLocale } from '@/contexts/LocaleContext';
import { locales, localeNames, localeFlags, Locale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="relative group">
      <button className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-base">{localeFlags[locale]}</span>
          <span className="text-sm font-medium text-gray-700">{localeNames[locale]}</span>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100]">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={`w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
              locale === loc ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700'
            }`}
          >
            <span className="text-base">{localeFlags[loc]}</span>
            <span className="text-sm">{localeNames[loc]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
