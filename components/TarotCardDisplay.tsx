'use client';

import { useState } from 'react';
import { TarotCard, SpreadPosition } from '@/types/tarot';

interface TarotCardDisplayProps {
  position: SpreadPosition;
  card?: TarotCard;
  isReversed?: boolean;
  onSelectPosition?: () => void;
  onPlaceCard?: () => void;
  isSelectable?: boolean;
  isPlaceable?: boolean;
}

export default function TarotCardDisplay({ position, card, isReversed, onSelectPosition, onPlaceCard, isSelectable, isPlaceable }: TarotCardDisplayProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // 如果沒有牌且可選擇位置（開始選牌）
  if (!card && isSelectable && onSelectPosition) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="aspect-[2/3] w-full max-w-[180px] cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={onSelectPosition}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 rounded-xl border-4 border-yellow-400 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow">
            <div className="text-white text-4xl font-bold animate-pulse">🔮</div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <div className="text-sm font-semibold text-gray-700">{position.name}</div>
          <div className="text-xs text-gray-500 mt-1">點擊選擇牌</div>
        </div>
      </div>
    );
  }

  // 如果沒有牌但可以放置牌（已選中牌，等待放置）
  if (!card && isPlaceable && onPlaceCard) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="aspect-[2/3] w-full max-w-[180px] cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-purple-400"
          onClick={onPlaceCard}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-300 via-pink-300 to-purple-500 rounded-xl shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow">
            <div className="text-purple-800 text-3xl font-bold animate-bounce">✨</div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <div className="text-sm font-semibold text-gray-700">{position.name}</div>
          <div className="text-xs text-purple-600 mt-1 font-semibold">點擊放置牌</div>
        </div>
      </div>
    );
  }

  // 如果沒有牌且不可操作
  if (!card) {
    return (
      <div className="flex flex-col items-center">
        <div className="aspect-[2/3] w-full max-w-[180px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl border-2 border-gray-300 flex items-center justify-center shadow-md">
          <div className="text-gray-400 text-sm">未抽牌</div>
        </div>
        <div className="mt-2 text-center">
          <div className="text-sm font-semibold text-gray-700">{position.name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="aspect-[2/3] w-full max-w-[180px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* 牌背 */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 rounded-xl border-4 border-yellow-400 shadow-2xl flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
          >
            <div className="text-white text-4xl font-bold">🔮</div>
          </div>

          {/* 牌面 */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-300 shadow-xl p-3 flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden', 
              transform: `rotateY(180deg) ${isReversed ? 'rotate(180deg)' : ''}` 
            }}
          >
            <div 
              className="text-center flex-1 flex flex-col justify-between"
              style={{ transform: isReversed ? 'rotate(180deg)' : 'none' }}
            >
              <div>
                <div className="text-xs text-amber-700 font-semibold mb-1">{card.suit === 'major' ? '大阿卡納' : 
                  card.suit === 'wands' ? '權杖' :
                  card.suit === 'cups' ? '聖杯' :
                  card.suit === 'swords' ? '寶劍' : '錢幣'}</div>
                <div className="text-lg font-bold text-amber-900 mb-2">{card.name}</div>
                <div className="text-xs text-amber-700 italic">{card.nameEn}</div>
              </div>
              
              <div className="text-4xl mb-2">
                {card.suit === 'major' ? '🌟' :
                 card.suit === 'wands' ? '🔥' :
                 card.suit === 'cups' ? '💧' :
                 card.suit === 'swords' ? '⚔️' : '💰'}
              </div>
              
              <div className="text-xs text-amber-800 mt-2">
                {isReversed ? (
                  <div>
                    <div className="font-semibold text-red-600 mb-1">逆位</div>
                    <div>{card.reversed}</div>
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold text-green-600 mb-1">正位</div>
                    <div>{card.upright}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <div className="text-sm font-semibold text-gray-700">{position.name}</div>
        {isFlipped && (
          <div className="text-xs text-gray-500 mt-1">
            {isReversed ? '逆位' : '正位'}
          </div>
        )}
      </div>
    </div>
  );
}

