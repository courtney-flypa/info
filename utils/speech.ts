// 語音合成工具函數

import { Language } from '@/types/game';

let speechSynthesis: SpeechSynthesis | null = null;

if (typeof window !== 'undefined') {
  speechSynthesis = window.speechSynthesis;
}

// 語言對應的語音代碼
const languageCodes: Record<Language, string> = {
  japanese: 'ja-JP',
  korean: 'ko-KR',
  thai: 'th-TH'
};

// 播放語音（支持多語言）
export function speak(text: string, language: Language = 'japanese'): void {
  if (!speechSynthesis) return;
  
  // 取消之前的語音
  speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCodes[language];
  utterance.rate = 0.9;
  
  speechSynthesis.speak(utterance);
}

// 停止語音
export function stopSpeaking(): void {
  if (!speechSynthesis) return;
  speechSynthesis.cancel();
}

