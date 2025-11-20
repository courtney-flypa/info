'use client';

import { useState, useEffect } from 'react';
import { SpreadType, SpreadPosition, TarotCard } from '@/types/tarot';
import { spreadConfigs, shuffleDeck, drawCards, randomReversed } from '@/lib/tarot';
import { tarotCards } from '@/data/tarotData';
import TarotCardDisplay from './TarotCardDisplay';
import TarotCardRack from './TarotCardRack';

interface TarotReadingProps {
  spreadType: SpreadType;
  onBack: () => void;
  onShuffle: () => void;
  isShuffled: boolean;
}

export default function TarotReading({ spreadType, onBack, onShuffle, isShuffled }: TarotReadingProps) {
  const [allCards, setAllCards] = useState<TarotCard[]>([]);
  const [positions, setPositions] = useState<SpreadPosition[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showCardSelection, setShowCardSelection] = useState(false);

  const config = spreadConfigs[spreadType];

  // 初始化牌組
  useEffect(() => {
    if (isShuffled && allCards.length === 0) {
      const shuffled = shuffleDeck(tarotCards);
      setAllCards(shuffled);
      // 初始化位置
      setPositions(config.positions.map(pos => ({ ...pos })));
      setSelectedCard(null);
      setSelectedPositionId(null);
      setIsComplete(false);
      setShowCardSelection(false);
    }
  }, [isShuffled, config.positions]);

  // 獲取未使用的牌
  const getAvailableCards = () => {
    const usedCardIds = positions.filter(p => p.card).map(p => p.card!.id);
    return allCards.filter(card => !usedCardIds.includes(card.id));
  };

  // 選擇牌
  const handleSelectCard = (card: TarotCard) => {
    if (isComplete) return;
    setSelectedCard(card);
    setShowCardSelection(false);
  };

  // 將選中的牌放到指定位置
  const handlePlaceCard = (positionId: number) => {
    if (!selectedCard || isComplete) return;
    
    const positionIndex = positions.findIndex(p => p.id === positionId);
    if (positionIndex === -1 || positions[positionIndex].card) return;

    const reversed = randomReversed();
    const newPositions = [...positions];
    newPositions[positionIndex] = {
      ...newPositions[positionIndex],
      card: selectedCard,
      isReversed: reversed,
    };

    setPositions(newPositions);
    setSelectedCard(null);
    setSelectedPositionId(null);
    
    // 檢查是否所有牌都抽完了
    const remaining = newPositions.filter(p => !p.card).length;
    if (remaining === 0) {
      setIsComplete(true);
    }
  };

  // 開始選擇牌
  const handleStartSelection = (positionId: number) => {
    if (isComplete) return;
    const position = positions.find(p => p.id === positionId);
    if (position?.card) return; // 位置已有牌
    
    setSelectedPositionId(positionId);
    setShowCardSelection(true);
  };

  // 重新洗牌
  const handleReshuffle = () => {
    const shuffled = shuffleDeck(tarotCards);
    setAllCards(shuffled);
    setPositions(config.positions.map(pos => ({ ...pos })));
    setSelectedCard(null);
    setSelectedPositionId(null);
    setIsComplete(false);
    setShowCardSelection(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-2 px-6 rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          ← 返回
        </button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {config.name}
        </h2>
        <div className="w-24"></div> {/* 佔位符，保持標題居中 */}
      </div>

      {!isShuffled ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔮</div>
            <p className="text-gray-600 text-lg mb-6">準備好開始占卜了嗎？</p>
            <button
              onClick={onShuffle}
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 text-white py-4 px-8 rounded-2xl text-lg font-bold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              開始洗牌
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              {isComplete ? (
                <span className="text-green-600 font-semibold">✨ 所有牌已抽完</span>
              ) : selectedCard ? (
                <span className="text-purple-600 font-semibold">已選擇牌，請點擊位置放置</span>
              ) : (
                <span>還需抽 {config.cardCount - positions.filter(p => p.card).length} 張牌</span>
              )}
            </div>
            <button
              onClick={handleReshuffle}
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 px-6 rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              🔄 重新洗牌
            </button>
          </div>

          {/* 牌陣位置 */}
          <div className={`grid gap-4 mb-6 ${
            config.cardCount === 1 ? 'grid-cols-1 justify-center' :
            config.cardCount === 2 ? 'grid-cols-2' :
            config.cardCount === 3 ? 'grid-cols-3' :
            config.cardCount === 4 ? 'grid-cols-2 md:grid-cols-4' :
            config.cardCount === 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' :
            config.cardCount === 6 ? 'grid-cols-2 md:grid-cols-3' :
            config.cardCount === 7 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
            config.cardCount === 8 ? 'grid-cols-2 md:grid-cols-4' :
            config.cardCount === 10 ? 'grid-cols-2 md:grid-cols-5' :
            'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {positions.map((position) => (
              <TarotCardDisplay
                key={position.id}
                position={position}
                card={position.card}
                isReversed={position.isReversed}
                onSelectPosition={!position.card && !isComplete && !selectedCard ? () => handleStartSelection(position.id) : undefined}
                onPlaceCard={!position.card && selectedCard ? () => handlePlaceCard(position.id) : undefined}
                isSelectable={!position.card && !isComplete && !selectedCard}
                isPlaceable={!position.card && selectedCard !== null}
              />
            ))}
          </div>

          {/* 選擇牌的界面 - 牌架樣式 */}
          {showCardSelection && (
            <div className="mb-6">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setShowCardSelection(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
              <TarotCardRack
                cards={getAvailableCards()}
                onSelectCard={handleSelectCard}
                selectedPositionName={positions.find(p => p.id === selectedPositionId)?.name}
              />
            </div>
          )}

          {/* 已選擇的牌顯示 */}
          {selectedCard && !showCardSelection && (
            <div className="mt-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <p className="text-center text-gray-700">
                <span className="font-semibold text-purple-600">已選擇：</span>
                <span className="ml-2">{selectedCard.name}</span>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="ml-4 text-sm text-purple-600 hover:text-purple-800 underline"
                >
                  取消選擇
                </button>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

