'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GameMode, Language } from '@/types/game';
import { getDatabases, isValidLanguage, isValidModeForLanguage } from '@/lib/dataLoader';
import GameScreen from '@/components/GameScreen';
import ResultScreen from '@/components/ResultScreen';

type Screen = 'game' | 'result';

export default function LanguageGameModePageClient() {
  const params = useParams();
  const router = useRouter();
  const language = params.language as string;
  const mode = params.mode as string;
  const [screen, setScreen] = useState<Screen>('game');
  const [finalScore, setFinalScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    // 驗證語言和模式是否有效
    if (!isValidLanguage(language)) {
      router.push('/game');
      return;
    }

    if (!isValidModeForLanguage(language as Language, mode)) {
      router.push(`/game/${language}`);
      return;
    }

    // 準備題目（隨機抽取）
    const databases = getDatabases(language as Language);
    const fullData = databases[mode as GameMode];
    if (!fullData) return;
    
    const limit = Math.min(10, fullData.length);
    const shuffled = [...fullData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, limit));
  }, [language, mode, router]);

  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    setScreen('result');
  };

  const handlePlayAgain = () => {
    // 重新準備題目
    const databases = getDatabases(language as Language);
    const fullData = databases[mode as GameMode];
    if (!fullData) return;
    
    const limit = Math.min(10, fullData.length);
    const shuffled = [...fullData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, limit));
    setScreen('game');
    setFinalScore(0);
  };

  const handleGoHome = () => {
    router.push(`/game/${language}`);
  };

  if (questions.length === 0) {
    return null; // 或顯示載入中
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-md min-h-[650px] flex flex-col border border-white/20">
        {screen === 'game' ? (
          <GameScreen
            mode={mode as GameMode}
            questions={questions}
            onGameEnd={handleGameEnd}
            onGoHome={handleGoHome}
            language={language as Language}
          />
        ) : (
          <ResultScreen
            score={finalScore}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
          />
        )}
      </div>
    </div>
  );
}

