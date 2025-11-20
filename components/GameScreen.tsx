'use client';

import { useState, useEffect, useCallback } from 'react';
import { Question, GameMode, Language } from '@/types/game';
import QuestionCard from './QuestionCard';
import OptionButton from './OptionButton';
import { speak, stopSpeaking } from '@/utils/speech';
import { useLocale } from '@/contexts/LocaleContext';

interface GameScreenProps {
  mode: GameMode;
  questions: Question[];
  onGameEnd: (score: number) => void;
  onGoHome: () => void;
  language?: Language;
}

// 從模式推斷語言
function getLanguageFromMode(mode: GameMode): Language {
  if (mode.startsWith('korean_')) return 'korean';
  if (mode.startsWith('thai_')) return 'thai';
  return 'japanese';
}

const QUESTION_LIMIT = 10;
const TIME_PER_QUESTION = 5000; // 5秒

export default function GameScreen({ mode, questions, onGameEnd, onGoHome, language }: GameScreenProps) {
  const { t } = useLocale();
  const gameLanguage = language || getLanguageFromMode(mode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);
  const [isAnswering, setIsAnswering] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [showCombo, setShowCombo] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // 生成選項
  const generateOptions = useCallback((correct: Question): string[] => {
    const options = [correct.a];
    
    while (options.length < 4) {
      const randomItem = questions[Math.floor(Math.random() * questions.length)];
      if (!options.includes(randomItem.a)) {
        options.push(randomItem.a);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  }, [questions]);

  const [options, setOptions] = useState<string[]>(() => 
    currentQuestion ? generateOptions(currentQuestion) : []
  );

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + 1 >= totalQuestions) {
        return prev;
      }
      return prev + 1;
    });
  }, [totalQuestions]);

  // 載入新題目
  useEffect(() => {
    if (!currentQuestion) {
      onGameEnd(score);
      return;
    }

    setIsAnswering(false);
    setSelectedOption(null);
    setCorrectAnswer(null);
    setTimeLeft(100);
    setOptions(generateOptions(currentQuestion));
    
    // 播放語音
    speak(currentQuestion.speech || currentQuestion.q, gameLanguage);

    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    // 開始計時
    intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, TIME_PER_QUESTION / 100);

    // 設定超時處理
    timeoutId = setTimeout(() => {
      setIsAnswering((prevIsAnswering) => {
        if (prevIsAnswering) return prevIsAnswering;
        
        setIsAnswering(true);
        setCombo(0);
        setCorrectAnswer(currentQuestion.a);
        
        setTimeout(() => {
          setCurrentIndex((prev) => {
            if (prev + 1 >= totalQuestions) {
              onGameEnd(score);
              return prev;
            }
            return prev + 1;
          });
        }, 1500);
        
        return true;
      });
    }, TIME_PER_QUESTION);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      stopSpeaking();
    };
  }, [currentIndex, currentQuestion, generateOptions, totalQuestions, onGameEnd, score]);

  const handleAnswer = (selected: string) => {
    if (isAnswering) return;
    
    setIsAnswering(true);
    setSelectedOption(selected);
    setCorrectAnswer(currentQuestion.a);
    
    // 清除計時器
    const currentTime = timeLeft;
    
    if (selected === currentQuestion.a) {
      // 正確
      const timeBonus = Math.floor(currentTime / 10);
      const comboBonus = combo * 5;
      const points = 10 + timeBonus + comboBonus;
      setScore((prev) => prev + points);
      setCombo((prev) => {
        const newCombo = prev + 1;
        if (newCombo > 1) {
          setShowCombo(true);
          setTimeout(() => setShowCombo(false), 500);
        }
        return newCombo;
      });
      
      // 再唸一次
      speak(currentQuestion.speech || currentQuestion.q, gameLanguage);
    } else {
      // 錯誤
      setCombo(0);
    }
    
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= totalQuestions) {
          // 使用最新的分數
          setScore((finalScore) => {
            onGameEnd(finalScore);
            return finalScore;
          });
          return prev;
        }
        return nextIndex;
      });
    }, 1200);
  };


  if (!currentQuestion) {
    return null;
  }

  const timerColor = timeLeft < 30 ? 'bg-red-500' : 'bg-pink-500';

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-2 font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-lg">
        <span className="flex items-center gap-1">
          <span>⭐</span>
          <span>{t('score')}: {score}</span>
        </span>
        <span className="flex items-center gap-1">
          <span>📝</span>
          <span>{t('questionNumber')}: {currentIndex + 1} / {totalQuestions}</span>
        </span>
      </div>

      <div className={`bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent font-black text-xl mb-1 h-6 transition-opacity ${showCombo ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>
        {combo > 1 && `✨ COMBO x${combo}! 🔥`}
      </div>

      <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden mb-6 shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${timeLeft < 30 ? 'from-rose-400 to-rose-500' : 'from-pink-400 to-purple-500'} transition-all duration-100 ease-linear rounded-full shadow-sm`}
          style={{ width: `${timeLeft}%` }}
        />
      </div>

      <QuestionCard question={currentQuestion} mode={mode} />

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <OptionButton
            key={index}
            text={option}
            onClick={() => handleAnswer(option)}
            isCorrect={selectedOption === option && option === correctAnswer}
            isWrong={selectedOption === option && option !== correctAnswer}
            disabled={isAnswering}
          />
        ))}
      </div>
    </div>
  );
}

