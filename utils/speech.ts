// 語音合成工具函數

let speechSynthesis: SpeechSynthesis | null = null;

if (typeof window !== 'undefined') {
  speechSynthesis = window.speechSynthesis;
}

// 播放日文語音
export function speak(text: string): void {
  if (!speechSynthesis) return;
  
  // 取消之前的語音
  speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.9;
  
  speechSynthesis.speak(utterance);
}

// 停止語音
export function stopSpeaking(): void {
  if (!speechSynthesis) return;
  speechSynthesis.cancel();
}

