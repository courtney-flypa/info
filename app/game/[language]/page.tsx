import { Language } from '@/types/game';
import LanguageGamePageClient from './LanguageGamePageClient';

// 為靜態導出生成所有可能的路徑
export function generateStaticParams() {
  return [
    { language: 'japanese' },
    { language: 'korean' },
    { language: 'thai' },
  ];
}

export default function LanguageGamePage() {
  return <LanguageGamePageClient />;
}
