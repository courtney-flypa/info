import { Language } from '@/types/game';
import { getAvailableModes } from '@/lib/dataLoader';
import LanguageGameModePageClient from './LanguageGameModePageClient';

// 為靜態導出生成所有可能的路徑
export function generateStaticParams() {
  const languages: Language[] = ['japanese', 'korean', 'thai'];
  const params: { language: string; mode: string }[] = [];
  
  languages.forEach((lang) => {
    const modes = getAvailableModes(lang);
    modes.forEach((mode) => {
      params.push({ language: lang, mode });
    });
  });
  
  return params;
}

export default function LanguageGameModePage() {
  return <LanguageGameModePageClient />;
}
