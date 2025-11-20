'use client';

import { usePathname, useRouter } from 'next/navigation';
import { getCurrentNickname } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import LanguageSwitcher from './LanguageSwitcher';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);
  const { t } = useLocale();

  useEffect(() => {
    setNickname(getCurrentNickname());
  }, [pathname]);

  // 首頁不顯示側邊欄
  if (pathname === '/') {
    return null;
  }

  const menuItems = [
    { name: t('game'), path: '/game', icon: '🎮' },
    { name: t('records'), path: '/records', icon: '📊' },
  ];

  return (
    <>
      {/* 側邊欄 */}
      <aside
        className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        } ${isOpen ? '' : 'overflow-hidden'}`}
      >
        <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 shadow-sm">
          {/* 標題區域 */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between gap-3">
              <div 
                className="flex items-center gap-2 cursor-pointer group flex-1"
                onClick={() => router.push('/game')}
              >
                <span className="text-2xl">🌸</span>
                <span className="text-lg font-semibold text-gray-800">
                  {t('siteName')}
                </span>
              </div>
              
              {/* 收合按鈕 */}
              <button
                onClick={onToggle}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                aria-label={isOpen ? '收合側邊欄' : '展開側邊欄'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* 選單項目 */}
          <nav className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-pink-50 text-pink-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* 語言切換和使用者資訊 */}
          <div className="p-4 border-t border-gray-200 space-y-3 relative overflow-visible">
            {isOpen && (
              <div className="relative z-[100]">
                <div className="text-xs font-medium text-gray-500 mb-2">語言</div>
                <LanguageSwitcher />
              </div>
            )}
            {nickname && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs font-medium text-gray-500 mb-1">{t('user')}</div>
                <div className="text-sm font-medium text-gray-800 truncate">
                  {nickname}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 側邊欄收合時的展開按鈕 */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-4 top-4 w-10 h-10 bg-white/90 backdrop-blur-sm border border-pink-200 text-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center hover:bg-pink-50 hover:scale-110 active:scale-95"
          aria-label="展開側邊欄"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* 遮罩層（手機版用） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/5 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
