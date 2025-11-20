'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCurrentNickname } from '@/utils/storage';
import { GameMode } from '@/types/game';
import { databases } from '@/data/japaneseData';
import GameScreen from '@/components/GameScreen';
import ResultScreen from '@/components/ResultScreen';
import { addRecord } from '@/utils/storage';

type Screen = 'game' | 'result';

export default function GameModePage() {
  const params = useParams();
  const router = useRouter();
  const mode = params.mode as GameMode;
  const [screen, setScreen] = useState<Screen>('game');
  const [finalScore, setFinalScore] = useState(0);
  const [questions, setQuestions] = useState<typeof databases[GameMode]>([]);
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const current = getCurrentNickname();
    if (!current) {
      router.push('/');
      return;
    }
    setNickname(current);

    // 驗證模式是否有效
    if (!mode || !databases[mode as GameMode]) {
      router.push('/game');
      return;
    }

    // 準備題目（隨機抽取）
    const fullData = databases[mode as GameMode];
    const limit = Math.min(10, fullData.length);
    const shuffled = [...fullData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, limit));
  }, [mode, router]);

  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    setScreen('result');
    
    // 儲存成績
    if (nickname) {
      addRecord(nickname, {
        mode,
        score,
        date: new Date().toISOString(),
        nickname
      });
    }
  };

  const handlePlayAgain = () => {
    // 重新準備題目
    const fullData = databases[mode];
    const limit = Math.min(10, fullData.length);
    const shuffled = [...fullData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, limit));
    setScreen('game');
    setFinalScore(0);
  };

  const handleGoHome = () => {
    router.push('/game');
  };

  if (!nickname || questions.length === 0) {
    return null; // 或顯示載入中
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-md min-h-[650px] flex flex-col border border-white/20">
        {screen === 'game' ? (
          <GameScreen
            mode={mode}
            questions={questions}
            onGameEnd={handleGameEnd}
            onGoHome={handleGoHome}
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

