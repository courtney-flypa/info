'use client';

import { useRouter } from 'next/navigation';
import { Language } from '@/types/game';

export default function GamePage() {
  const router = useRouter();

  const languages: { lang: Language; name: string; flag: string; color: string }[] = [
    { lang: 'japanese', name: '日文', flag: '🇯🇵', color: 'from-pink-400 via-purple-400 to-pink-400' },
    { lang: 'korean', name: '韓文', flag: '🇰🇷', color: 'from-blue-400 via-cyan-400 to-blue-400' },
    { lang: 'thai', name: '泰文', flag: '🇹🇭', color: 'from-orange-400 via-red-400 to-orange-400' }
  ];

  const handleSelectLanguage = (language: Language) => {
    router.push(`/game/${language}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-md min-h-[500px] flex flex-col border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            選擇語言
          </h1>
          <p className="text-gray-600">選擇您想學習的語言</p>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {languages.map(({ lang, name, flag, color }) => (
            <button
              key={lang}
              onClick={() => handleSelectLanguage(lang)}
              className={`w-full bg-gradient-to-r ${color} text-white py-6 rounded-2xl text-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3`}
            >
              <span className="text-3xl">{flag}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

