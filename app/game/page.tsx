'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentNickname, setCurrentNickname } from '@/utils/storage';
import MenuScreen from '@/components/MenuScreen';
import NicknameModal from '@/components/NicknameModal';
import { GameMode } from '@/types/game';

export default function GamePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);

  useEffect(() => {
    const current = getCurrentNickname();
    if (!current) {
      // 沒有暱稱時顯示輸入框
      setShowNicknameModal(true);
    } else {
      setNickname(current);
    }
  }, []);

  const handleNicknameConfirm = (newNickname: string) => {
    setCurrentNickname(newNickname);
    setNickname(newNickname);
    setShowNicknameModal(false);
  };

  const handleSelectMode = (mode: GameMode) => {
    // 檢查是否有暱稱，沒有就顯示輸入框
    const current = getCurrentNickname();
    if (!current) {
      setShowNicknameModal(true);
      return;
    }
    router.push(`/game/${mode}`);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl w-full max-w-md min-h-[700px] flex flex-col border border-white/20">
          <MenuScreen onSelectMode={handleSelectMode} />
        </div>
      </div>
      
      <NicknameModal
        isOpen={showNicknameModal}
        onConfirm={handleNicknameConfirm}
      />
    </>
  );
}

