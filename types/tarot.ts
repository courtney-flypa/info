// 塔羅牌類型定義

export type TarotSuit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  suit: TarotSuit;
  number: number; // 大阿卡納為 0-21，小阿卡納為 1-14
  upright: string; // 正位意義
  reversed: string; // 逆位意義
}

export type SpreadType =
  | 'single'           // 抽單張
  | 'two'              // 抽兩張
  | 'three'            // 抽三張
  | 'five'             // 抽五張
  | 'seven'            // 抽七張
  | 'flow_of_time'     // 時間之流
  | 'body_mind_spirit' // 身心靈
  | 'four_elements'    // 四元素
  | 'general'          // 通用牌陣
  | 'heart_of_love'    // 戀愛之心
  | 'relationship_dev' // 關係發展
  | 'two_person'       // 兩人關係
  | 'love_triangle'    // 三角關係
  | 'reconciliation'   // 舊情復合
  | 'choose_two'       // 二擇一
  | 'choose_three'     // 三擇一
  | 'four_seasons'     // 四季牌陣
  | 'six_star'         // 六星芒
  | 'seven_planets'    // 七行星
  | 'eight_directions' // 八方位
  | 'predicament'      // 困境算什麼
  | 'twelve_houses'    // 十二宮位
  | 'annual_guidance'  // 年度發展指引
  | 'horseshoe'        // 處境馬蹄鐵
  | 'celtic_cross';    // 塞爾特十字

export interface SpreadPosition {
  id: number;
  name: string;
  card?: TarotCard;
  isReversed?: boolean;
}

export interface SpreadConfig {
  type: SpreadType;
  name: string;
  cardCount: number;
  positions: SpreadPosition[];
}

