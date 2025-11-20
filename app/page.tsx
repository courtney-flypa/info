'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from '@/contexts/LocaleContext';

export default function Home() {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 relative overflow-hidden">
      {/* 可愛的背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">🌸</div>
        <div className="absolute top-20 right-20 text-5xl opacity-10 animate-bounce">💕</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>💖</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-10">🦋</div>
        <div className="absolute top-1/3 right-1/3 text-4xl opacity-10">🌺</div>
      </div>
      
      <div className="bg-white/90 backdrop-blur-md p-12 rounded-[2rem] shadow-2xl w-full max-w-md text-center border-2 border-white/50 relative">
        {/* 卡片內裝飾 */}
        <div className="absolute top-4 right-4 text-3xl opacity-20 animate-spin-slow">✨</div>
        <div className="absolute bottom-4 left-4 text-3xl opacity-20 animate-pulse">💕</div>
        
        <div className="mb-10 relative z-10">
          <div className="inline-block mb-4">
            <div className="text-7xl animate-bounce" style={{ animationDuration: '2s' }}>🌸</div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
            {t('siteName')}
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
            <span>💖</span>
            <span>{t('welcome')}</span>
            <span>💖</span>
          </p>
        </div>
        
        <button
          onClick={() => router.push('/game')}
          className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 text-white py-5 rounded-2xl text-lg font-bold hover:from-pink-500 hover:via-purple-500 hover:to-pink-500 transition-all mb-6 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-2xl group-hover:scale-125 transition-transform">✨</span>
            <span>{t('startLearning')}</span>
            <span className="text-2xl group-hover:scale-125 transition-transform">✨</span>
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </button>
        
      </div>
    </div>
  );
}
