'use client';

import { usePathname, useRouter } from 'next/navigation';
import { getCurrentNickname } from '@/utils/storage';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    setNickname(getCurrentNickname());
  }, [pathname]);

  // 首頁不顯示導航欄
  if (pathname === '/') {
    return null;
  }

  const tabs = [
    { name: '遊戲', path: '/game', icon: '🎮' },
    { name: '記錄', path: '/records', icon: '📊' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="text-xl font-bold text-purple-600 cursor-pointer"
            onClick={() => router.push('/game')}
          >
            🇯🇵 日文學習
          </div>
          
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path || pathname?.startsWith(tab.path + '/');
              return (
                <button
                  key={tab.path}
                  onClick={() => router.push(tab.path)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              );
            })}
          </div>

          {nickname && (
            <div className="text-sm text-gray-500">
              {nickname}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

