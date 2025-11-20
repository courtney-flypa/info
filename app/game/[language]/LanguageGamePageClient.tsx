'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MenuScreen from '@/components/MenuScreen';
import { GameMode, Language } from '@/types/game';
import { isValidLanguage } from '@/lib/dataLoader';

export default function LanguageGamePageClient() {
  const params = useParams();
  const router = useRouter();
  const language = params.language as string;

  useEffect(() => {
    if (!isValidLanguage(language)) {
      router.push('/game');
    }
  }, [language, router]);

  if (!isValidLanguage(language)) {
    return null;
  }

  const handleSelectMode = (mode: GameMode) => {
    router.push(`/game/${language}/${mode}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl w-full max-w-md min-h-[700px] flex flex-col border border-white/20">
        <MenuScreen language={language as Language} onSelectMode={handleSelectMode} />
      </div>
    </div>
  );
}

