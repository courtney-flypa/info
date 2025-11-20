import { UserData, GameRecord } from '@/types/game';

const STORAGE_KEY = 'japanese-learning-data';

// 取得所有使用者資料
export function getAllUsers(): Record<string, UserData> {
  if (typeof window === 'undefined') return {};
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return {};
  
  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// 取得特定使用者的資料
export function getUserData(nickname: string): UserData | null {
  const allUsers = getAllUsers();
  return allUsers[nickname] || null;
}

// 儲存使用者資料
export function saveUserData(nickname: string, data: UserData): void {
  if (typeof window === 'undefined') return;
  
  const allUsers = getAllUsers();
  allUsers[nickname] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));
}

// 新增成績記錄
export function addRecord(nickname: string, record: GameRecord): void {
  const userData = getUserData(nickname) || {
    nickname,
    records: []
  };
  
  userData.records.push(record);
  saveUserData(nickname, userData);
}

// 取得使用者的所有記錄
export function getUserRecords(nickname: string): GameRecord[] {
  const userData = getUserData(nickname);
  return userData?.records || [];
}

// 刪除單筆記錄
export function deleteRecord(nickname: string, recordIndex: number): void {
  if (typeof window === 'undefined') return;
  
  const userData = getUserData(nickname);
  if (!userData || !userData.records) return;
  
  if (recordIndex >= 0 && recordIndex < userData.records.length) {
    userData.records.splice(recordIndex, 1);
    saveUserData(nickname, userData);
  }
}

// 清空使用者的所有記錄
export function clearUserRecords(nickname: string): void {
  if (typeof window === 'undefined') return;
  
  const userData = getUserData(nickname);
  if (!userData) return;
  
  userData.records = [];
  saveUserData(nickname, userData);
}

// 取得當前使用者暱稱（從 sessionStorage）
export function getCurrentNickname(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('current-nickname');
}

// 設定當前使用者暱稱
export function setCurrentNickname(nickname: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('current-nickname', nickname);
}
