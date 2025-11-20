'use client';

import { Question } from '@/types/game';
import { speak } from '@/utils/speech';
import { useLocale } from '@/contexts/LocaleContext';

interface QuestionCardProps {
  question: Question;
  mode: string;
}

export default function QuestionCard({ question, mode }: QuestionCardProps) {
  const { t } = useLocale();
  const handleClick = () => {
    speak(question.speech || question.q);
  };

  // 根據模式和問題長度調整字體大小
  const getFontSize = () => {
    if (mode === 'hiragana' || mode === 'katakana') {
      return 'text-6xl';
    }
    if (question.q.length > 8) {
      return 'text-3xl';
    }
    return 'text-4xl';
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 text-white p-8 rounded-2xl mb-6 relative shadow-md cursor-pointer transition-all hover:shadow-lg"
    >
      <span className="absolute top-4 right-4 bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-lg hover:bg-white/30 transition-colors">
        🔊
      </span>
      
      <div className="relative z-10">
        <div className={`${getFontSize()} font-bold mb-3 leading-tight text-center`}>
          {question.q}
        </div>
        <div className="text-sm opacity-70 min-h-[1.5em] text-center">
          {mode === 'hiragana' || mode === 'katakana' ? '' : t('clickToListen')}
        </div>
      </div>
    </div>
  );
}
