---
title: "TypeScript 實用技巧與最佳實踐"
date: "2024-02-25"
excerpt: "分享我在使用 TypeScript 開發過程中學到的實用技巧和最佳實踐，幫助寫出更安全、更易維護的程式碼。"
category: "tech"
---

# TypeScript 實用技巧與最佳實踐

TypeScript 已經成為現代前端開發的標準，但很多開發者只是「會用」，而不是「善用」。本文分享一些實用技巧，讓你的 TypeScript 程式碼更優雅、更安全。

## 類型定義技巧

### 1. 使用 `type` vs `interface`

```typescript
// 使用 type 定義聯合類型、交叉類型
type Status = 'pending' | 'success' | 'error';
type ID = string | number;

// 使用 interface 定義物件結構（可擴展）
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: 'admin';
}
```

**建議**：物件結構用 `interface`，其他用 `type`。

### 2. 使用 `as const` 確保類型推斷

```typescript
// 沒有 as const
const colors = ['red', 'green', 'blue'];
// 類型：string[]

// 有 as const
const colors = ['red', 'green', 'blue'] as const;
// 類型：readonly ["red", "green", "blue"]

// 可以推斷出精確的聯合類型
type Color = typeof colors[number]; // "red" | "green" | "blue"
```

### 3. 使用 `satisfies` 運算符（TypeScript 4.9+）

```typescript
// 確保符合類型，但保留更精確的推斷
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} satisfies Config;

// config.timeout 的類型是 5000，而不是 number
```

## 實用工具類型

### 1. `Partial<T>`

讓所有屬性變成可選：

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }
```

### 2. `Pick<T, K>` 和 `Omit<T, K>`

```typescript
interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

// 只選取特定屬性
type PublicUser = Pick<User, 'name' | 'email'>;

// 排除特定屬性
type UserWithoutPassword = Omit<User, 'password'>;
```

### 3. `Record<K, V>`

定義物件類型：

```typescript
type Status = 'pending' | 'success' | 'error';
type StatusConfig = Record<Status, { color: string; icon: string }>;

const config: StatusConfig = {
  pending: { color: 'yellow', icon: '⏳' },
  success: { color: 'green', icon: '✅' },
  error: { color: 'red', icon: '❌' },
};
```

### 4. `NonNullable<T>`

排除 null 和 undefined：

```typescript
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string
```

## 函數類型

### 1. 函數重載

```typescript
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value);
}
```

### 2. 泛型函數

```typescript
function identity<T>(value: T): T {
  return value;
}

// 使用時推斷類型
const result = identity('hello'); // string
const num = identity(42); // number
```

### 3. 條件類型

```typescript
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<string>; // false
```

## 錯誤處理

### 1. Result 類型

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function fetchUser(id: string): Promise<Result<User>> {
  // ...
}
```

### 2. 類型守衛

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function process(value: unknown) {
  if (isString(value)) {
    // TypeScript 知道這裡 value 是 string
    console.log(value.toUpperCase());
  }
}
```

## 實用模式

### 1. 品牌類型（Branded Types）

```typescript
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

// 防止混用不同類型的 ID
const userId: UserId = createUserId('123');
const productId: ProductId = createUserId('456');
// userId === productId // 類型錯誤
```

### 2. 模板字面量類型

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'
```

### 3. 遞迴類型

```typescript
type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JsonValue[] 
  | { [key: string]: JsonValue };
```

## 配置建議

### tsconfig.json 推薦設定

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 常見陷阱

### 1. 避免使用 `any`

```typescript
// ❌ 不好
function process(data: any) {
  // ...
}

// ✅ 好
function process(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    // 類型守衛後使用
  }
}
```

### 2. 小心 `as` 斷言

```typescript
// ❌ 危險
const user = data as User;

// ✅ 安全
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'age' in data
  );
}
```

## 結語

TypeScript 是一個強大的工具，但需要正確使用才能發揮最大效益。記住：

1. **類型安全優先**：寧可多寫一些類型定義，也不要使用 `any`
2. **善用工具類型**：減少重複的類型定義
3. **理解類型推斷**：讓 TypeScript 幫你推斷類型
4. **持續學習**：TypeScript 不斷更新，保持學習新特性

希望這些技巧對你有幫助！如果有其他實用技巧，歡迎分享。

