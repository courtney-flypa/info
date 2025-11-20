'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  // 首頁不顯示導航欄
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <div 
            className="text-xl font-bold text-purple-600 cursor-pointer"
            onClick={() => router.push('/game')}
          >
            🌍 語言學習
          </div>
        </div>
      </div>
    </nav>
  );
}

