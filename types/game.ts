// 語言類型
export type Language = 'japanese' | 'korean' | 'thai';

// 遊戲模式類型
export type GameMode = 
  // 日文模式
  | 'hiragana' 
  | 'katakana' 
  | 'n5_words' 
  | 'phrases' 
  | 'numbers' 
  | 'travel'
  // 韓文模式
  | 'korean_consonants'
  | 'korean_vowels'
  | 'korean_words'
  | 'korean_phrases'
  // 泰文模式
  | 'thai_consonants'
  | 'thai_vowels'
  | 'thai_words'
  | 'thai_phrases';

// 題目資料結構
export interface Question {
  q: string;        // 問題
  a: string;        // 答案（中文）
  speech?: string;  // 發音（可選）
}

// 遊戲狀態
export interface GameState {
  currentMode: GameMode | '';
  questionQueue: Question[];
  currentQuestionIndex: number;
  score: number;
  combo: number;
  timeLeft: number;
  isAnswering: boolean;
}

