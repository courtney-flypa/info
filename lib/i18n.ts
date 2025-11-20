// 多語系支援

export type Locale = 'zh-TW' | 'en' | 'ja';

export const locales: Locale[] = ['zh-TW', 'en', 'ja'];

export const localeNames: Record<Locale, string> = {
  'zh-TW': '繁體中文',
  'en': 'English',
  'ja': '日本語'
};

export const localeFlags: Record<Locale, string> = {
  'zh-TW': '🇹🇼',
  'en': '🇺🇸',
  'ja': '🇯🇵'
};

// 日期格式化的 locale 映射
export const dateLocales: Record<Locale, string> = {
  'zh-TW': 'zh-TW',
  'en': 'en-US',
  'ja': 'ja-JP'
};

// 語言資源
export const translations = {
  'zh-TW': {
    siteName: '蘑菇的家',
    welcome: '歡迎來到日文學習網站！',
    startLearning: '開始學習',
    nicknamePrompt: '點擊開始學習，進入遊戲時會提示輸入暱稱',
    enterNickname: '輸入暱稱',
    nicknameLabel: '暱稱',
    nicknamePlaceholder: '例如：小明',
    nicknamePromptBeforeGame: '開始遊戲前，請先輸入您的暱稱',
    nicknameRequired: '請輸入暱稱',
    nicknameMaxLength: '暱稱不能超過20個字元',
    confirm: '確認',
    cancel: '取消',
    guestMode: '訪客模式：資料將儲存在瀏覽器中',
    game: '遊戲',
    records: '記錄',
    user: '使用者',
    welcomeUser: '歡迎，{nickname}！',
    todayPractice: '今天想練習什麼呢？',
    japaneseTraining: '日文全能特訓',
    score: 'Score',
    questionNumber: '題號',
    clickToListen: '點擊聽發音',
    challengeEnd: '挑戰結束',
    playAgain: '再玩一次',
    backToMenu: '回主選單',
    noRecords: '還沒有任何記錄',
    startGameToRecord: '開始遊戲來建立記錄吧！',
    nicknameLabel2: '暱稱：',
    backToGame: '返回遊戲',
    modeNames: {
      hiragana: '平假名',
      katakana: '片假名',
      n5_words: 'N5 單字',
      phrases: '日常短句',
      numbers: '數字日期',
      travel: '旅遊實用',
      korean_consonants: '韓文子音',
      korean_vowels: '韓文母音',
      korean_words: '韓文單字',
      korean_phrases: '日常短句',
      thai_consonants: '泰文子音',
      thai_vowels: '泰文母音',
      thai_words: '泰文單字',
      thai_phrases: '日常短句'
    },
    resultMessages: {
      excellent: '太強了！你是日文大師！',
      good: '很棒喔！繼續保持！',
      keepPracticing: '多練習幾次會更好喔！'
    },
    confirmDelete: '確定要刪除這筆記錄嗎？',
    clearAll: '清空全部',
    confirmClearAll: '確定要清空所有記錄嗎？',
    clearAllWarning: '此操作無法復原'
  },
  'en': {
    siteName: "Mushroom's Home",
    welcome: 'Welcome to Japanese Learning Website!',
    startLearning: 'Start Learning',
    nicknamePrompt: 'Click to start learning, you will be prompted to enter a nickname when entering the game',
    enterNickname: 'Enter Nickname',
    nicknameLabel: 'Nickname',
    nicknamePlaceholder: 'e.g., John',
    nicknamePromptBeforeGame: 'Please enter your nickname before starting the game',
    nicknameRequired: 'Please enter a nickname',
    nicknameMaxLength: 'Nickname cannot exceed 20 characters',
    confirm: 'Confirm',
    cancel: 'Cancel',
    guestMode: 'Guest Mode: Data will be stored in your browser',
    game: 'Game',
    records: 'Records',
    user: 'User',
    welcomeUser: 'Welcome, {nickname}!',
    todayPractice: 'What would you like to practice today?',
    japaneseTraining: 'Japanese Training',
    score: 'Score',
    questionNumber: 'Question',
    clickToListen: 'Click to listen',
    challengeEnd: 'Challenge Complete',
    playAgain: 'Play Again',
    backToMenu: 'Back to Menu',
    noRecords: 'No records yet',
    startGameToRecord: 'Start playing to create records!',
    nicknameLabel2: 'Nickname: ',
    backToGame: 'Back to Game',
    modeNames: {
      hiragana: 'Hiragana',
      katakana: 'Katakana',
      n5_words: 'N5 Words',
      phrases: 'Daily Phrases',
      numbers: 'Numbers & Dates',
      travel: 'Travel Phrases',
      korean_consonants: 'Korean Consonants',
      korean_vowels: 'Korean Vowels',
      korean_words: 'Korean Words',
      korean_phrases: 'Daily Phrases',
      thai_consonants: 'Thai Consonants',
      thai_vowels: 'Thai Vowels',
      thai_words: 'Thai Words',
      thai_phrases: 'Daily Phrases'
    },
    resultMessages: {
      excellent: "Amazing! You're a Japanese master!",
      good: 'Great job! Keep it up!',
      keepPracticing: 'Keep practicing and you will improve!'
    },
    confirmDelete: 'Are you sure you want to delete this record?',
    clearAll: 'Clear All',
    confirmClearAll: 'Are you sure you want to clear all records?',
    clearAllWarning: 'This action cannot be undone'
  },
  'ja': {
    siteName: 'きのこの家',
    welcome: '日本語学習サイトへようこそ！',
    startLearning: '学習を始める',
    nicknamePrompt: 'クリックして学習を始めます。ゲームに入るとニックネームの入力が求められます',
    enterNickname: 'ニックネームを入力',
    nicknameLabel: 'ニックネーム',
    nicknamePlaceholder: '例：太郎',
    nicknamePromptBeforeGame: 'ゲームを始める前に、ニックネームを入力してください',
    nicknameRequired: 'ニックネームを入力してください',
    nicknameMaxLength: 'ニックネームは20文字以内で入力してください',
    confirm: '確認',
    cancel: 'キャンセル',
    guestMode: 'ゲストモード：データはブラウザに保存されます',
    game: 'ゲーム',
    records: '記録',
    user: 'ユーザー',
    welcomeUser: 'ようこそ、{nickname}さん！',
    todayPractice: '今日は何を練習しますか？',
    japaneseTraining: '日本語トレーニング',
    score: 'スコア',
    questionNumber: '問題',
    clickToListen: 'クリックして聞く',
    challengeEnd: 'チャレンジ終了',
    playAgain: 'もう一度',
    backToMenu: 'メニューに戻る',
    noRecords: '記録がまだありません',
    startGameToRecord: 'ゲームを始めて記録を作成しましょう！',
    nicknameLabel2: 'ニックネーム：',
    backToGame: 'ゲームに戻る',
    modeNames: {
      hiragana: 'ひらがな',
      katakana: 'カタカナ',
      n5_words: 'N5単語',
      phrases: '日常会話',
      numbers: '数字と日付',
      travel: '旅行フレーズ',
      korean_consonants: '韓国語子音',
      korean_vowels: '韓国語母音',
      korean_words: '韓国語単語',
      korean_phrases: '日常会話',
      thai_consonants: 'タイ語子音',
      thai_vowels: 'タイ語母音',
      thai_words: 'タイ語単語',
      thai_phrases: '日常会話'
    },
    resultMessages: {
      excellent: 'すごい！あなたは日本語マスターです！',
      good: 'よくできました！続けましょう！',
      keepPracticing: 'もっと練習すれば上達します！'
    },
    confirmDelete: 'この記録を削除してもよろしいですか？',
    clearAll: 'すべてクリア',
    confirmClearAll: 'すべての記録をクリアしてもよろしいですか？',
    clearAllWarning: 'この操作は元に戻せません'
  }
};

// 取得翻譯
export function getTranslation(locale: Locale, key: string, params?: Record<string, string>): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    // 如果找不到翻譯，回退到繁體中文
    value = translations['zh-TW'];
    for (const k of keys) {
      value = value?.[k];
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // 替換參數
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] || match;
    });
  }
  
  return value;
}

// 儲存和讀取語言設定
export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-TW';
  const stored = localStorage.getItem('locale') as Locale;
  return stored && locales.includes(stored) ? stored : 'zh-TW';
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('locale', locale);
}

