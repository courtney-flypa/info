'use client';

import { BlogPost } from '@/types/blog';

interface ArticleContentProps {
  post: BlogPost;
}

export default function ArticleContent({ post }: ArticleContentProps) {
  const categoryEmoji = post.category === 'travel' ? '✈️' : '💻';
  const categoryColor = post.category === 'travel' 
    ? 'from-pink-400 via-purple-400 to-pink-400' 
    : 'from-blue-400 via-cyan-400 to-blue-400';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 border border-white/20">
      {/* 標題區域 */}
      <header className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-2xl px-3 py-1 rounded-full bg-gradient-to-r ${categoryColor} text-white font-semibold text-sm`}>
            {categoryEmoji} {post.category === 'travel' ? '旅遊' : '技術'}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(post.date)}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* 文章內容 */}
      <div 
        className="article-content text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
        style={{
          fontSize: '1.125rem',
        }}
      />
    </article>
  );
}

