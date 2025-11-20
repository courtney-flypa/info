---
title: "Next.js App Router 完全指南"
date: "2024-03-10"
excerpt: "深入解析 Next.js 13+ 的 App Router，包括路由系統、Server Components、資料獲取等核心概念。"
category: "tech"
---

# Next.js App Router 完全指南

Next.js 13 引入了全新的 App Router，這是對 Next.js 架構的重大改變。本文將深入解析 App Router 的核心概念和最佳實踐。

## 什麼是 App Router？

App Router 是 Next.js 13+ 的新路由系統，基於 React Server Components 構建。它提供了更強大的功能，包括：

- 更好的效能（Server Components）
- 更簡單的路由系統（基於文件夾結構）
- 內建的 Layout 支援
- 更好的資料獲取方式

## 文件夾結構

App Router 使用 `app` 目錄來定義路由：

```
app/
  ├── page.tsx          # 首頁 (/)
  ├── layout.tsx        # 根布局
  ├── about/
  │   └── page.tsx      # /about
  └── blog/
      ├── page.tsx      # /blog
      └── [slug]/
          └── page.tsx  # /blog/[slug]
```

### 特殊文件

- `page.tsx`：定義路由的 UI
- `layout.tsx`：定義共享的布局
- `loading.tsx`：定義載入狀態
- `error.tsx`：定義錯誤處理
- `not-found.tsx`：定義 404 頁面

## Server Components vs Client Components

### Server Components（預設）

```typescript
// app/components/ServerComponent.tsx
// 預設是 Server Component
export default function ServerComponent() {
  // 可以直接存取資料庫、API
  const data = await fetch('https://api.example.com/data');
  
  return <div>{data.title}</div>;
}
```

**優點**：
- 不包含在 JavaScript bundle 中
- 可以直接存取後端資源
- 更好的 SEO

### Client Components

```typescript
// app/components/ClientComponent.tsx
'use client'; // 必須加上這個指令

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**使用時機**：
- 需要互動性（onClick、onChange 等）
- 需要使用 React Hooks
- 需要使用瀏覽器 API

## 資料獲取

### Server Components 中的資料獲取

```typescript
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store', // 或 'force-cache'
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

### 快取策略

- `cache: 'force-cache'`：預設，快取請求
- `cache: 'no-store'`：不快取，每次都重新獲取
- `next: { revalidate: 3600 }`：ISR，每小時重新驗證

## 動態路由

### 單一參數

```typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <div>Post: {params.slug}</div>;
}
```

### 多個參數

```typescript
// app/shop/[category]/[id]/page.tsx
export default function Product({ 
  params 
}: { 
  params: { category: string; id: string } 
}) {
  return <div>{params.category} - {params.id}</div>;
}
```

### 可選參數

```typescript
// app/shop/[[...slug]]/page.tsx
// 匹配 /shop、/shop/a、/shop/a/b 等
```

## 靜態生成

### generateStaticParams

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  // ...
}
```

## Layouts

Layout 可以共享 UI 和狀態：

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Dashboard Nav</nav>
      {children}
    </div>
  );
}
```

## 最佳實踐

### 1. 盡量使用 Server Components

只有在需要互動性時才使用 Client Components。

### 2. 正確使用 'use client'

只在需要的地方加上 `'use client'`，避免不必要的客戶端 bundle。

### 3. 資料獲取在 Server Components

在 Server Components 中獲取資料，然後傳遞給 Client Components。

### 4. 使用 Loading 和 Error 狀態

```typescript
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}

// app/blog/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## 遷移建議

如果從 Pages Router 遷移到 App Router：

1. 逐步遷移，兩個可以共存
2. 先遷移簡單的頁面
3. 注意 API Routes 的變化
4. 更新 `getStaticProps` 和 `getServerSideProps` 的邏輯

## 結語

App Router 是 Next.js 的未來方向，提供了更強大的功能和更好的開發體驗。雖然學習曲線較陡，但掌握後會發現它比 Pages Router 更加靈活和強大。

建議從簡單的專案開始練習，逐步熟悉 Server Components 和資料獲取的方式。

