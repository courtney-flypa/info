import { TarotCard } from '@/types/tarot';
import { tarotCards } from '@/data/tarotData';
import { SpreadType, SpreadConfig, SpreadPosition } from '@/types/tarot';

// 洗牌函數（Fisher-Yates 洗牌算法）
export function shuffleDeck(cards: TarotCard[]): TarotCard[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 抽牌函數
export function drawCards(deck: TarotCard[], count: number): { cards: TarotCard[], remainingDeck: TarotCard[] } {
  const drawn = deck.slice(0, count);
  const remaining = deck.slice(count);
  return { cards: drawn, remainingDeck: remaining };
}

// 隨機決定是否逆位
export function randomReversed(): boolean {
  return Math.random() < 0.5;
}

// 牌陣配置
export const spreadConfigs: Record<SpreadType, SpreadConfig> = {
  single: {
    type: 'single',
    name: '抽單張',
    cardCount: 1,
    positions: [{ id: 1, name: '現在' }],
  },
  two: {
    type: 'two',
    name: '抽兩張',
    cardCount: 2,
    positions: [{ id: 1, name: '過去' }, { id: 2, name: '未來' }],
  },
  three: {
    type: 'three',
    name: '抽三張',
    cardCount: 3,
    positions: [{ id: 1, name: '過去' }, { id: 2, name: '現在' }, { id: 3, name: '未來' }],
  },
  five: {
    type: 'five',
    name: '抽五張',
    cardCount: 5,
    positions: [
      { id: 1, name: '過去' },
      { id: 2, name: '現在' },
      { id: 3, name: '未來' },
      { id: 4, name: '建議' },
      { id: 5, name: '結果' },
    ],
  },
  seven: {
    type: 'seven',
    name: '抽七張',
    cardCount: 7,
    positions: [
      { id: 1, name: '過去' },
      { id: 2, name: '現在' },
      { id: 3, name: '未來' },
      { id: 4, name: '建議' },
      { id: 5, name: '環境' },
      { id: 6, name: '希望' },
      { id: 7, name: '結果' },
    ],
  },
  flow_of_time: {
    type: 'flow_of_time',
    name: '時間之流',
    cardCount: 3,
    positions: [{ id: 1, name: '過去' }, { id: 2, name: '現在' }, { id: 3, name: '未來' }],
  },
  body_mind_spirit: {
    type: 'body_mind_spirit',
    name: '身心靈',
    cardCount: 3,
    positions: [{ id: 1, name: '身體' }, { id: 2, name: '心靈' }, { id: 3, name: '精神' }],
  },
  four_elements: {
    type: 'four_elements',
    name: '四元素',
    cardCount: 4,
    positions: [
      { id: 1, name: '火元素' },
      { id: 2, name: '水元素' },
      { id: 3, name: '風元素' },
      { id: 4, name: '土元素' },
    ],
  },
  general: {
    type: 'general',
    name: '通用牌陣',
    cardCount: 5,
    positions: [
      { id: 1, name: '現況' },
      { id: 2, name: '阻礙' },
      { id: 3, name: '建議' },
      { id: 4, name: '未來' },
      { id: 5, name: '結果' },
    ],
  },
  heart_of_love: {
    type: 'heart_of_love',
    name: '戀愛之心',
    cardCount: 5,
    positions: [
      { id: 1, name: '你的心' },
      { id: 2, name: '對方的心' },
      { id: 3, name: '關係現況' },
      { id: 4, name: '阻礙' },
      { id: 5, name: '未來發展' },
    ],
  },
  relationship_dev: {
    type: 'relationship_dev',
    name: '關係發展',
    cardCount: 5,
    positions: [
      { id: 1, name: '過去' },
      { id: 2, name: '現在' },
      { id: 3, name: '未來' },
      { id: 4, name: '你的想法' },
      { id: 5, name: '對方的想法' },
    ],
  },
  two_person: {
    type: 'two_person',
    name: '兩人關係',
    cardCount: 6,
    positions: [
      { id: 1, name: '你' },
      { id: 2, name: '對方' },
      { id: 3, name: '關係' },
      { id: 4, name: '過去' },
      { id: 5, name: '現在' },
      { id: 6, name: '未來' },
    ],
  },
  love_triangle: {
    type: 'love_triangle',
    name: '三角關係',
    cardCount: 3,
    positions: [{ id: 1, name: '你' }, { id: 2, name: '對方A' }, { id: 3, name: '對方B' }],
  },
  reconciliation: {
    type: 'reconciliation',
    name: '舊情復合',
    cardCount: 5,
    positions: [
      { id: 1, name: '過去關係' },
      { id: 2, name: '分離原因' },
      { id: 3, name: '現在狀況' },
      { id: 4, name: '復合可能性' },
      { id: 5, name: '建議' },
    ],
  },
  choose_two: {
    type: 'choose_two',
    name: '二擇一',
    cardCount: 5,
    positions: [
      { id: 1, name: '現況' },
      { id: 2, name: '選擇A' },
      { id: 3, name: '選擇B' },
      { id: 4, name: '選擇A結果' },
      { id: 5, name: '選擇B結果' },
    ],
  },
  choose_three: {
    type: 'choose_three',
    name: '三擇一',
    cardCount: 4,
    positions: [
      { id: 1, name: '現況' },
      { id: 2, name: '選擇A' },
      { id: 3, name: '選擇B' },
      { id: 4, name: '選擇C' },
    ],
  },
  four_seasons: {
    type: 'four_seasons',
    name: '四季牌陣',
    cardCount: 4,
    positions: [
      { id: 1, name: '春' },
      { id: 2, name: '夏' },
      { id: 3, name: '秋' },
      { id: 4, name: '冬' },
    ],
  },
  six_star: {
    type: 'six_star',
    name: '六星芒',
    cardCount: 6,
    positions: [
      { id: 1, name: '過去' },
      { id: 2, name: '現在' },
      { id: 3, name: '未來' },
      { id: 4, name: '建議' },
      { id: 5, name: '阻礙' },
      { id: 6, name: '結果' },
    ],
  },
  seven_planets: {
    type: 'seven_planets',
    name: '七行星',
    cardCount: 7,
    positions: [
      { id: 1, name: '太陽' },
      { id: 2, name: '月亮' },
      { id: 3, name: '水星' },
      { id: 4, name: '金星' },
      { id: 5, name: '火星' },
      { id: 6, name: '木星' },
      { id: 7, name: '土星' },
    ],
  },
  eight_directions: {
    type: 'eight_directions',
    name: '八方位',
    cardCount: 8,
    positions: [
      { id: 1, name: '東' },
      { id: 2, name: '南' },
      { id: 3, name: '西' },
      { id: 4, name: '北' },
      { id: 5, name: '東南' },
      { id: 6, name: '西南' },
      { id: 7, name: '西北' },
      { id: 8, name: '東北' },
    ],
  },
  predicament: {
    type: 'predicament',
    name: '困境算什麼',
    cardCount: 5,
    positions: [
      { id: 1, name: '困境' },
      { id: 2, name: '原因' },
      { id: 3, name: '建議' },
      { id: 4, name: '行動' },
      { id: 5, name: '結果' },
    ],
  },
  twelve_houses: {
    type: 'twelve_houses',
    name: '十二宮位',
    cardCount: 12,
    positions: [
      { id: 1, name: '第一宮' },
      { id: 2, name: '第二宮' },
      { id: 3, name: '第三宮' },
      { id: 4, name: '第四宮' },
      { id: 5, name: '第五宮' },
      { id: 6, name: '第六宮' },
      { id: 7, name: '第七宮' },
      { id: 8, name: '第八宮' },
      { id: 9, name: '第九宮' },
      { id: 10, name: '第十宮' },
      { id: 11, name: '第十一宮' },
      { id: 12, name: '第十二宮' },
    ],
  },
  annual_guidance: {
    type: 'annual_guidance',
    name: '年度發展指引',
    cardCount: 12,
    positions: [
      { id: 1, name: '一月' },
      { id: 2, name: '二月' },
      { id: 3, name: '三月' },
      { id: 4, name: '四月' },
      { id: 5, name: '五月' },
      { id: 6, name: '六月' },
      { id: 7, name: '七月' },
      { id: 8, name: '八月' },
      { id: 9, name: '九月' },
      { id: 10, name: '十月' },
      { id: 11, name: '十一月' },
      { id: 12, name: '十二月' },
    ],
  },
  horseshoe: {
    type: 'horseshoe',
    name: '處境馬蹄鐵',
    cardCount: 7,
    positions: [
      { id: 1, name: '過去' },
      { id: 2, name: '現在' },
      { id: 3, name: '未來' },
      { id: 4, name: '建議' },
      { id: 5, name: '環境' },
      { id: 6, name: '阻礙' },
      { id: 7, name: '結果' },
    ],
  },
  celtic_cross: {
    type: 'celtic_cross',
    name: '塞爾特十字',
    cardCount: 10,
    positions: [
      { id: 1, name: '現況' },
      { id: 2, name: '挑戰' },
      { id: 3, name: '遠因' },
      { id: 4, name: '近因' },
      { id: 5, name: '過去' },
      { id: 6, name: '未來' },
      { id: 7, name: '你的態度' },
      { id: 8, name: '環境' },
      { id: 9, name: '希望與恐懼' },
      { id: 10, name: '結果' },
    ],
  },
};

// 獲取所有牌陣選項
export function getAllSpreadOptions(): { type: SpreadType; name: string }[] {
  return Object.values(spreadConfigs).map((config) => ({
    type: config.type,
    name: config.name,
  }));
}

