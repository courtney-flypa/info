'use client';

import { GameMode } from '@/types/game';
import { useLocale } from '@/contexts/LocaleContext';

interface ResultScreenProps {
  score: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export default function ResultScreen({ score, onPlayAgain, onGoHome }: ResultScreenProps) {
  const { t } = useLocale();
  
  const getResult = () => {
    if (score >= 250) {
      return {
        emoji: '👑',
        comment: t('resultMessages.excellent')
      };
    } else if (score >= 150) {
      return {
        emoji: '🎉',
        comment: t('resultMessages.good')
      };
    } else {
      return {
        emoji: '🌱',
        comment: t('resultMessages.keepPracticing')
      };
    }
  };

  const result = getResult();

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="text-7xl mb-6">{result.emoji}</div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {t('challengeEnd')}
      </h2>
      <div className="text-6xl font-bold text-pink-500 my-4">
        {score}
      </div>
      <div className="text-lg text-gray-600 mb-8">
        {result.comment}
      </div>
      
      <div className="space-y-3 w-full">
        <button
          onClick={onPlayAgain}
          className="w-full bg-pink-500 text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-pink-600 transition-colors shadow-sm"
        >
          {t('playAgain')}
        </button>
        <button
          onClick={onGoHome}
          className="w-full bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          {t('backToMenu')}
        </button>
      </div>
    </div>
  );
}
