'use client';

import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';

interface NicknameModalProps {
  isOpen: boolean;
  onConfirm: (nickname: string) => void;
  onCancel?: () => void;
}

export default function NicknameModal({ isOpen, onConfirm, onCancel }: NicknameModalProps) {
  const { t } = useLocale();
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError(t('nicknameRequired'));
      return;
    }

    if (nickname.trim().length > 20) {
      setError(t('nicknameMaxLength'));
      return;
    }

    onConfirm(nickname.trim());
    setNickname('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-pink-200/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-2xl w-full max-w-md p-10 border-2 border-white/60 relative overflow-hidden">
        {/* 可愛裝飾背景 */}
        <div className="absolute top-4 right-6 text-4xl opacity-15 animate-pulse">🌸</div>
        <div className="absolute bottom-6 left-6 text-4xl opacity-15 animate-bounce">💕</div>
        <div className="absolute top-1/2 right-1/4 text-3xl opacity-10 animate-spin-slow">✨</div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>💖</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              {t('enterNickname')}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{t('nicknamePromptBeforeGame')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nickname" className="block text-left text-gray-700 mb-3 font-medium flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <span>{t('nicknameLabel')}</span>
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setError('');
                }}
                placeholder={t('nicknamePlaceholder')}
                className="w-full px-5 py-4 border-2 border-pink-200 rounded-2xl text-base focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all bg-white shadow-sm"
                maxLength={20}
                autoFocus
              />
              {error && (
                <p className="text-rose-500 text-sm mt-3 text-left flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200">
                  <span>💔</span>
                  <span>{error}</span>
                </p>
              )}
            </div>
            
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 text-white py-4 rounded-2xl text-lg font-bold hover:from-pink-500 hover:via-purple-500 hover:to-pink-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-xl group-hover:scale-125 transition-transform">✨</span>
                  <span>{t('confirm')}</span>
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-2xl text-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                >
                  {t('cancel')}
                </button>
              )}
            </div>
          </form>
          
          <p className="text-xs text-gray-500 mt-6 text-center flex items-center justify-center gap-2">
            <span>💝</span>
            <span>{t('guestMode')}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
