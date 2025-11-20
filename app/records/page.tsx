'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentNickname, getUserRecords, deleteRecord, clearUserRecords } from '@/utils/storage';
import { GameRecord } from '@/types/game';
import { useLocale } from '@/contexts/LocaleContext';

export default function RecordsPage() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [nickname, setNickname] = useState<string | null>(null);
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const loadRecords = () => {
    const current = getCurrentNickname();
    if (current) {
      setRecords(getUserRecords(current));
    }
  };

  useEffect(() => {
    const current = getCurrentNickname();
    if (!current) {
      router.push('/');
      return;
    }
    setNickname(current);
    loadRecords();
  }, [router]);

  const handleDeleteRecord = (index: number) => {
    if (nickname && window.confirm(t('confirmDelete') || '確定要刪除這筆記錄嗎？')) {
      deleteRecord(nickname, index);
      loadRecords();
    }
  };

  const handleClearAll = () => {
    if (nickname) {
      clearUserRecords(nickname);
      loadRecords();
      setShowClearConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateLocaleMap: Record<string, string> = {
      'zh-TW': 'zh-TW',
      'en': 'en-US',
      'ja': 'ja-JP'
    };
    
    const localeString = dateLocaleMap[locale] || 'zh-TW';
    
    return date.toLocaleString(localeString, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!nickname) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-2xl max-h-[calc(90vh-5rem)] flex flex-col border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <span>📊</span>
            <span>{t('records')}</span>
          </h1>
          {records.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors flex items-center gap-1"
            >
              <span>🗑️</span>
              <span>{t('clearAll') || '清空全部'}</span>
            </button>
          )}
        </div>

        <div className="text-sm bg-gray-50 rounded-lg p-3 mb-6 border border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">{t('nicknameLabel2')}</span>
            <span className="text-gray-800 font-semibold">{nickname}</span>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-lg font-medium mb-2">{t('noRecords')}</p>
              <p className="text-sm text-gray-400">{t('startGameToRecord')}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              {records
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-pink-200/50 hover:border-pink-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 mb-1">
                          {t(`modeNames.${record.mode}`)}
                        </div>
                        <span className="text-gray-500 text-sm">
                          {formatDate(record.date)}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-pink-500">
                        {record.score}
                      </div>
                      <button
                        onClick={() => handleDeleteRecord(index)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-2 hover:bg-red-50 rounded-lg"
                        aria-label="刪除記錄"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 清空確認對話框 */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-sm p-8 border-2 border-white/60">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('confirmClearAll') || '確定要清空所有記錄嗎？'}
              </h3>
              <p className="text-sm text-gray-600">
                {t('clearAllWarning') || '此操作無法復原'}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                {t('cancel') || '取消'}
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                {t('confirm') || '確定'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

