import { Language, GameMode, Question } from '@/types/game';
import { databases as japaneseDatabases, modeNames as japaneseModeNames, modeIcons as japaneseModeIcons } from '@/data/japaneseData';
import { databases as koreanDatabases, modeNames as koreanModeNames, modeIcons as koreanModeIcons } from '@/data/koreanData';
import { databases as thaiDatabases, modeNames as thaiModeNames, modeIcons as thaiModeIcons } from '@/data/thaiData';

// 語言對應的數據庫
const languageDatabases: Record<Language, Partial<Record<GameMode, Question[]>>> = {
  japanese: japaneseDatabases,
  korean: koreanDatabases,
  thai: thaiDatabases
};

// 語言對應的模式名稱
const languageModeNames: Record<Language, Partial<Record<GameMode, string>>> = {
  japanese: japaneseModeNames,
  korean: koreanModeNames,
  thai: thaiModeNames
};

// 語言對應的模式圖示
const languageModeIcons: Record<Language, Partial<Record<GameMode, string>>> = {
  japanese: japaneseModeIcons,
  korean: koreanModeIcons,
  thai: thaiModeIcons
};

// 獲取指定語言的數據庫
export function getDatabases(language: Language): Partial<Record<GameMode, Question[]>> {
  return languageDatabases[language];
}

// 獲取指定語言的模式名稱
export function getModeNames(language: Language): Partial<Record<GameMode, string>> {
  return languageModeNames[language];
}

// 獲取指定語言的模式圖示
export function getModeIcons(language: Language): Partial<Record<GameMode, string>> {
  return languageModeIcons[language];
}

// 獲取指定語言的所有可用模式
export function getAvailableModes(language: Language): GameMode[] {
  const databases = getDatabases(language);
  return Object.keys(databases) as GameMode[];
}

// 驗證語言是否有效
export function isValidLanguage(lang: string): lang is Language {
  return ['japanese', 'korean', 'thai'].includes(lang);
}

// 驗證模式是否對指定語言有效
export function isValidModeForLanguage(language: Language, mode: string): mode is GameMode {
  const databases = getDatabases(language);
  return mode in databases;
}

