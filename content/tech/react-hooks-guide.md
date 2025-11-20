---
title: "React Hooks 完整指南 - 從基礎到進階"
date: "2024-01-30"
excerpt: "深入解析 React Hooks 的使用方式，包括常用 Hooks 的實戰應用和自定義 Hooks 的設計模式。"
category: "tech"
---

# React Hooks 完整指南 - 從基礎到進階

React Hooks 自 2019 年推出以來，已經成為 React 開發的標準方式。本文將從基礎到進階，全面解析 Hooks 的使用。

## 基礎 Hooks

### useState

最常用的 Hook，用於管理組件狀態：

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

**最佳實踐**：
- 使用函數式更新避免閉包問題
- 狀態結構化，避免過度嵌套

```typescript
// ✅ 函數式更新
setCount(prev => prev + 1);

// ✅ 結構化狀態
const [user, setUser] = useState({ name: '', email: '' });
```

### useEffect

處理副作用（API 請求、訂閱、DOM 操作等）：

```typescript
import { useEffect, useState } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // 清理函數
    const controller = new AbortController();
    
    fetch(`/api/users/${userId}`, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(setUser);
    
    // 清理：取消請求
    return () => {
      controller.abort();
    };
  }, [userId]); // 依賴陣列
  
  return <div>{user?.name}</div>;
}
```

**依賴陣列規則**：
- 空陣列 `[]`：只在掛載和卸載時執行
- 有依賴：依賴變化時執行
- 無依賴陣列：每次渲染都執行（通常不建議）

### useContext

跨組件共享狀態：

```typescript
// 創建 Context
const ThemeContext = createContext<'light' | 'dark'>('light');

// Provider
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Child />
    </ThemeContext.Provider>
  );
}

// 使用
function Child() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}
```

## 進階 Hooks

### useReducer

管理複雜狀態邏輯：

```typescript
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

### useMemo

記憶化計算結果：

```typescript
function ExpensiveComponent({ items }: { items: number[] }) {
  // 只有 items 變化時才重新計算
  const sum = useMemo(() => {
    return items.reduce((acc, item) => acc + item, 0);
  }, [items]);
  
  return <div>Sum: {sum}</div>;
}
```

### useCallback

記憶化函數：

```typescript
function Parent() {
  const [count, setCount] = useState(0);
  
  // 只有依賴變化時才重新創建函數
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  
  return <Child onClick={handleClick} />;
}
```

## 自定義 Hooks

### 資料獲取 Hook

```typescript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, [url]);
  
  return { data, loading, error };
}
```

### 本地存儲 Hook

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
}
```

### 防抖 Hook

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

## 常見陷阱與最佳實踐

### 1. 避免在條件語句中使用 Hooks

```typescript
// ❌ 錯誤
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ 正確
const [state, setState] = useState(0);
```

### 2. 正確處理依賴陣列

```typescript
// ❌ 缺少依賴
useEffect(() => {
  fetchData(userId);
}, []); // 應該包含 userId

// ✅ 正確
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### 3. 避免過度使用 useMemo 和 useCallback

```typescript
// ❌ 不必要的優化
const value = useMemo(() => a + b, [a, b]); // 簡單計算不需要

// ✅ 只在真正需要時使用
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

## 結語

React Hooks 讓函數組件變得更加強大，但需要理解其工作原理才能正確使用。記住：

1. **Hooks 規則**：只在頂層調用，不在條件語句中使用
2. **依賴陣列**：正確設置依賴，避免閉包問題
3. **性能優化**：適度使用 useMemo 和 useCallback
4. **自定義 Hooks**：提取重複邏輯，提高程式碼重用性

掌握這些技巧，你就能寫出更優雅、更高效的 React 程式碼！

