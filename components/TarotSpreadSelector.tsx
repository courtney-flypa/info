'use client';

import { SpreadType } from '@/types/tarot';
import { getAllSpreadOptions } from '@/lib/tarot';

interface TarotSpreadSelectorProps {
  onSelectSpread: (spread: SpreadType) => void;
}

export default function TarotSpreadSelector({ onSelectSpread }: TarotSpreadSelectorProps) {
  const spreads = getAllSpreadOptions();

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          🔮 塔羅牌占卜 🔮
        </h1>
        <p className="text-gray-600 text-lg">選擇您想要的牌陣</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[500px] overflow-y-auto pr-2">
        {spreads.map((spread) => (
          <button
            key={spread.type}
            onClick={() => onSelectSpread(spread.type)}
            className="bg-gradient-to-br from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-gray-800 py-3 px-4 rounded-xl text-sm font-medium transition-all transform hover:scale-105 active:scale-95 border border-pink-200/50 shadow-sm hover:shadow-md"
          >
            {spread.name}
          </button>
        ))}
      </div>
    </div>
  );
}

