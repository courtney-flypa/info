// 遊戲模式類型
export type GameMode = 
  | 'hiragana' 
  | 'katakana' 
  | 'n5_words' 
  | 'phrases' 
  | 'numbers' 
  | 'travel';

// 題目資料結構
export interface Question {
  q: string;        // 問題（日文）
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

// 成績記錄
export interface GameRecord {
  mode: GameMode;
  score: number;
  date: string;
  nickname: string;
}

// 使用者資料
export interface UserData {
  nickname: string;
  records: GameRecord[];
}

