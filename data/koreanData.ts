import { Question, GameMode } from '@/types/game';

export const databases: Partial<Record<GameMode, Question[]>> = {
  korean_consonants: [
    { q: 'ㄱ', a: 'g/k' }, { q: 'ㄴ', a: 'n' }, { q: 'ㄷ', a: 'd/t' }, { q: 'ㄹ', a: 'r/l' }, { q: 'ㅁ', a: 'm' },
    { q: 'ㅂ', a: 'b/p' }, { q: 'ㅅ', a: 's' }, { q: 'ㅇ', a: 'ng' }, { q: 'ㅈ', a: 'j/ch' }, { q: 'ㅊ', a: 'ch' },
    { q: 'ㅋ', a: 'k' }, { q: 'ㅌ', a: 't' }, { q: 'ㅍ', a: 'p' }, { q: 'ㅎ', a: 'h' }
  ],
  korean_vowels: [
    { q: 'ㅏ', a: 'a' }, { q: 'ㅑ', a: 'ya' }, { q: 'ㅓ', a: 'eo' }, { q: 'ㅕ', a: 'yeo' }, { q: 'ㅗ', a: 'o' },
    { q: 'ㅛ', a: 'yo' }, { q: 'ㅜ', a: 'u' }, { q: 'ㅠ', a: 'yu' }, { q: 'ㅡ', a: 'eu' }, { q: 'ㅣ', a: 'i' },
    { q: 'ㅐ', a: 'ae' }, { q: 'ㅔ', a: 'e' }, { q: 'ㅚ', a: 'oe' }, { q: 'ㅟ', a: 'wi' }, { q: 'ㅢ', a: 'ui' }
  ],
  korean_words: [
    { q: '고양이', a: '貓', speech: '고양이' },
    { q: '개', a: '狗', speech: '개' },
    { q: '선생님', a: '老師', speech: '선생님' },
    { q: '학생', a: '學生', speech: '학생' },
    { q: '학교', a: '學校', speech: '학교' },
    { q: '책', a: '書', speech: '책' },
    { q: '물', a: '水', speech: '물' },
    { q: '먹다', a: '吃', speech: '먹다' },
    { q: '마시다', a: '喝', speech: '마시다' },
    { q: '크다', a: '大的', speech: '크다' },
    { q: '작다', a: '小的', speech: '작다' },
    { q: '물고기', a: '魚', speech: '물고기' },
    { q: '고기', a: '肉', speech: '고기' },
    { q: '역', a: '車站', speech: '역' },
    { q: '자동차', a: '車子', speech: '자동차' }
  ],
  korean_phrases: [
    { q: '안녕하세요', a: '你好', speech: '안녕하세요' },
    { q: '안녕히 가세요', a: '再見（對方離開）', speech: '안녕히 가세요' },
    { q: '안녕히 계세요', a: '再見（我離開）', speech: '안녕히 계세요' },
    { q: '감사합니다', a: '謝謝', speech: '감사합니다' },
    { q: '죄송합니다', a: '對不起', speech: '죄송합니다' },
    { q: '실례합니다', a: '不好意思/借過', speech: '실례합니다' },
    { q: '맛있게 드세요', a: '請享用', speech: '맛있게 드세요' },
    { q: '처음 뵙겠습니다', a: '初次見面', speech: '처음 뵙겠습니다' },
    { q: '괜찮아요', a: '沒關係', speech: '괜찮아요' },
    { q: '도와주세요', a: '請幫助我', speech: '도와주세요' }
  ],
  numbers: [
    { q: '일 (1)', a: '一', speech: '일' },
    { q: '이 (2)', a: '二', speech: '이' },
    { q: '삼 (3)', a: '三', speech: '삼' },
    { q: '사 (4)', a: '四', speech: '사' },
    { q: '오 (5)', a: '五', speech: '오' },
    { q: '육 (6)', a: '六', speech: '육' },
    { q: '칠 (7)', a: '七', speech: '칠' },
    { q: '팔 (8)', a: '八', speech: '팔' },
    { q: '구 (9)', a: '九', speech: '구' },
    { q: '십 (10)', a: '十', speech: '십' },
    { q: '백 (100)', a: '百', speech: '백' },
    { q: '천 (1000)', a: '千', speech: '천' },
    { q: '만 (10000)', a: '萬', speech: '만' },
    { q: '오늘', a: '今天', speech: '오늘' },
    { q: '내일', a: '明天', speech: '내일' },
    { q: '어제', a: '昨天', speech: '어제' },
    { q: '지금', a: '現在', speech: '지금' }
  ],
  travel: [
    { q: '화장실이 어디예요?', a: '廁所在哪裡？', speech: '화장실이 어디예요' },
    { q: '이거 얼마예요?', a: '這個多少錢？', speech: '이거 얼마예요' },
    { q: '메뉴 주세요', a: '請給我菜單', speech: '메뉴 주세요' },
    { q: '이거 주세요', a: '我要這個', speech: '이거 주세요' },
    { q: '계산서 주세요', a: '麻煩結帳', speech: '계산서 주세요' },
    { q: '카드 되나요?', a: '可以刷卡嗎？', speech: '카드 되나요' },
    { q: '한국어 못해요', a: '我不會說韓文', speech: '한국어 못해요' },
    { q: '영어 메뉴 있어요?', a: '有英文菜單嗎？', speech: '영어 메뉴 있어요' },
    { q: '사진 찍어도 돼요?', a: '可以拍照嗎？', speech: '사진 찍어도 돼요' },
    { q: '봉지', a: '袋子', speech: '봉지' }
  ]
};

// 遊戲模式顯示名稱
export const modeNames: Partial<Record<GameMode, string>> = {
  korean_consonants: '韓文子音',
  korean_vowels: '韓文母音',
  korean_words: '韓文單字',
  korean_phrases: '日常短句',
  numbers: '數字日期',
  travel: '旅遊實用'
};

// 遊戲模式圖示
export const modeIcons: Partial<Record<GameMode, string>> = {
  korean_consonants: 'ㄱ',
  korean_vowels: 'ㅏ',
  korean_words: '📘',
  korean_phrases: '💬',
  numbers: '🔢',
  travel: '✈️'
};

