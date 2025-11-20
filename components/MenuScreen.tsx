'use client';

import { useRouter } from 'next/navigation';
import { GameMode, Language } from '@/types/game';
import { getAvailableModes, getModeIcons, getModeNames } from '@/lib/dataLoader';
import { useLocale } from '@/contexts/LocaleContext';

interface MenuScreenProps {
  language: Language;
  onSelectMode: (mode: GameMode) => void;
}

export default function MenuScreen({ language, onSelectMode }: MenuScreenProps) {
  const router = useRouter();
  const { t } = useLocale();
  const modes = getAvailableModes(language);
  const modeIcons = getModeIcons(language);
  const modeNames = getModeNames(language);

  const languageInfo: Record<Language, { name: string; flag: string; emoji: string }> = {
    japanese: { name: '日文', flag: '🇯🇵', emoji: '🌸' },
    korean: { name: '韓文', flag: '🇰🇷', emoji: '💙' },
    thai: { name: '泰文', flag: '🇹🇭', emoji: '🌺' }
  };

  const getModeStyle = (mode: GameMode) => {
    const baseStyles: Record<string, { bg: string; shadow: string; decoration: string }> = {
      // 日文
      hiragana: { 
        bg: 'from-pink-100/80 via-pink-50/80 to-white/80', 
        shadow: 'hover:shadow-pink-200',
        decoration: '🌸'
      },
      katakana: { 
        bg: 'from-purple-100/80 via-purple-50/80 to-white/80', 
        shadow: 'hover:shadow-purple-200',
        decoration: '💜'
      },
      n5_words: { 
        bg: 'from-blue-100/80 via-blue-50/80 to-white/80', 
        shadow: 'hover:shadow-blue-200',
        decoration: '💙'
      },
      // 韓文
      korean_consonants: { 
        bg: 'from-blue-100/80 via-cyan-50/80 to-white/80', 
        shadow: 'hover:shadow-blue-200',
        decoration: '💙'
      },
      korean_vowels: { 
        bg: 'from-cyan-100/80 via-blue-50/80 to-white/80', 
        shadow: 'hover:shadow-cyan-200',
        decoration: '💎'
      },
      korean_words: { 
        bg: 'from-blue-100/80 via-blue-50/80 to-white/80', 
        shadow: 'hover:shadow-blue-200',
        decoration: '💙'
      },
      korean_phrases: { 
        bg: 'from-rose-100/80 via-rose-50/80 to-white/80', 
        shadow: 'hover:shadow-rose-200',
        decoration: '🌹'
      },
      // 泰文
      thai_consonants: { 
        bg: 'from-orange-100/80 via-red-50/80 to-white/80', 
        shadow: 'hover:shadow-orange-200',
        decoration: '🌺'
      },
      thai_vowels: { 
        bg: 'from-red-100/80 via-orange-50/80 to-white/80', 
        shadow: 'hover:shadow-red-200',
        decoration: '🌷'
      },
      thai_words: { 
        bg: 'from-orange-100/80 via-orange-50/80 to-white/80', 
        shadow: 'hover:shadow-orange-200',
        decoration: '🌺'
      },
      thai_phrases: { 
        bg: 'from-rose-100/80 via-rose-50/80 to-white/80', 
        shadow: 'hover:shadow-rose-200',
        decoration: '🌹'
      },
      // 通用
      phrases: { 
        bg: 'from-rose-100/80 via-rose-50/80 to-white/80', 
        shadow: 'hover:shadow-rose-200',
        decoration: '🌹'
      },
      numbers: { 
        bg: 'from-emerald-100/80 via-emerald-50/80 to-white/80', 
        shadow: 'hover:shadow-emerald-200',
        decoration: '💚'
      },
      travel: { 
        bg: 'from-amber-100/80 via-amber-50/80 to-white/80', 
        shadow: 'hover:shadow-amber-200',
        decoration: '✨'
      }
    };
    return baseStyles[mode] || { 
      bg: 'from-gray-100/80 via-gray-50/80 to-white/80', 
      shadow: 'hover:shadow-gray-200',
      decoration: '✨'
    };
  };

  return (
    <div className="flex-1 flex flex-col relative">
      {/* 可愛的裝飾元素 */}
      <div className="absolute top-0 right-0 text-2xl opacity-20 animate-pulse">✨</div>
      <div className="absolute top-8 left-2 text-xl opacity-15">💕</div>
      <div className="absolute bottom-20 right-4 text-2xl opacity-20 animate-bounce">🌸</div>
      
      {/* 標題區域 */}
      <div className="text-center mb-6 pt-2 relative z-10">
        <div className="inline-block mb-3">
          <div className="text-5xl animate-pulse">{languageInfo[language].emoji}</div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          {languageInfo[language].flag} {languageInfo[language].name}練習
        </h1>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <span>💖</span>
          <span>{t('todayPractice')}</span>
          <span>💖</span>
        </p>
      </div>
      
      {/* 遊戲模式卡片 */}
      <div className="flex-1 overflow-y-auto px-1 pb-2 relative z-10">
        <div className="space-y-3">
          {modes.map((mode, index) => {
            const style = getModeStyle(mode);
            return (
              <button
                key={mode}
                onClick={() => onSelectMode(mode)}
                style={{ animationDelay: `${index * 0.05}s` }}
                className={`w-full bg-gradient-to-r ${style.bg} backdrop-blur-sm rounded-2xl p-4 transition-all hover:shadow-lg ${style.shadow} hover:scale-[1.03] active:scale-[0.97] group border border-white/40 animate-fade-in`}
              >
                <div className="flex items-center gap-4">
                  {/* 裝飾emoji */}
                  <div className="text-2xl opacity-60 group-hover:scale-125 transition-transform">
                    {style.decoration}
                  </div>
                  
                  {/* 圖標 */}
                  <div className="w-12 h-12 bg-white/90 rounded-2xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all flex-shrink-0">
                    {modeIcons[mode] || '✨'}
                  </div>
                  
                  {/* 文字內容 */}
                  <div className="flex-1 text-left">
                    <div className="text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                      {modeNames[mode] || mode}
                    </div>
                  </div>
                  
                  {/* 愛心箭頭 */}
                  <div className="text-pink-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
