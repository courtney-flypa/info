'use client';

import { useState, useRef, useEffect } from 'react';
import { TarotCard } from '@/types/tarot';

interface TarotCardRackProps {
  cards: TarotCard[];
  onSelectCard: (card: TarotCard) => void;
  selectedPositionName?: string;
}

export default function TarotCardRack({ cards, onSelectCard, selectedPositionName }: TarotCardRackProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
    }
  }, [cards]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    const startX = e.pageX - scrollContainerRef.current.offsetLeft;
    const startScrollLeft = scrollContainerRef.current.scrollLeft;
    let isDragging = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollContainerRef.current) return;
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = startScrollLeft - walk;
      isDragging = true;
      setIsScrolling(true);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setTimeout(() => setIsScrolling(false), 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="w-full my-8">
      {/* 信息提示 */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">選擇一張牌</h3>
        {selectedPositionName && (
          <p className="text-sm text-gray-600">位置：{selectedPositionName}</p>
        )}
        <p className="text-sm text-gray-600">還有 {cards.length} 張牌可選</p>
      </div>

      {/* 牌架 - 橫向滾動，無背景 */}
      <div className="relative">
        {/* 左側漸變提示 */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        )}
        
        {/* 右側漸變提示 */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-r from-transparent to-white pointer-events-none z-10"></div>
        )}

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scrollbar-hide w-full"
          onMouseDown={handleMouseDown}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            cursor: 'grab',
          }}
          onMouseUp={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.style.cursor = 'grab';
            }
          }}
        >
          <div className="flex gap-1 min-w-max px-2">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={(e) => {
                  if (!isScrolling) {
                    onSelectCard(card);
                  }
                }}
                className="flex-shrink-0 cursor-pointer group select-none"
                title={card.name}
              >
                <div className="w-14 h-20 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 rounded-md border-2 border-yellow-400 shadow-lg flex items-center justify-center hover:scale-125 hover:shadow-2xl hover:border-yellow-300 hover:z-10 transition-all duration-300 relative overflow-hidden">
                  {/* 牌背圖案 */}
                  <div className="text-white text-lg font-bold group-hover:scale-150 transition-transform pointer-events-none">
                    🔮
                  </div>
                  {/* 懸停效果 */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

