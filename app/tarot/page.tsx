'use client';

import { useState } from 'react';
import TarotSpreadSelector from '@/components/TarotSpreadSelector';
import TarotReading from '@/components/TarotReading';
import { SpreadType } from '@/types/tarot';

export default function TarotPage() {
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [isShuffled, setIsShuffled] = useState(false);

  const handleSpreadSelect = (spread: SpreadType) => {
    setSelectedSpread(spread);
    setIsShuffled(false);
  };

  const handleBack = () => {
    setSelectedSpread(null);
    setIsShuffled(false);
  };

  const handleShuffle = () => {
    setIsShuffled(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-6xl min-h-[600px] flex flex-col border border-white/20">
        {!selectedSpread ? (
          <TarotSpreadSelector onSelectSpread={handleSpreadSelect} />
        ) : (
          <TarotReading
            spreadType={selectedSpread}
            onBack={handleBack}
            onShuffle={handleShuffle}
            isShuffled={isShuffled}
          />
        )}
      </div>
    </div>
  );
}

