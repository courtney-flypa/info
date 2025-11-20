'use client';

import { useRouter } from 'next/navigation';
import { BlogPostMetadata } from '@/types/blog';

interface ArticleCardProps {
  post: BlogPostMetadata;
  category: 'travel' | 'tech';
}

export default function ArticleCard({ post, category }: ArticleCardProps) {
  const router = useRouter();
  const categoryEmoji = category === 'travel' ? '✈️' : '💻';
  const categoryColor = category === 'travel' 
    ? 'from-pink-400 via-purple-400 to-pink-400' 
    : 'from-blue-400 via-cyan-400 to-blue-400';

  const handleClick = () => {
    router.push(`/blog/${category}/${post.slug}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-[1.02] active:scale-100 border border-white/20 group"
    >
      <div className="flex items-start gap-4">
        <div className={`text-4xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
          {categoryEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${categoryColor} text-white`}>
              {category === 'travel' ? '旅遊' : '技術'}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(post.date)}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center text-purple-500 text-sm font-medium group-hover:gap-2 transition-all">
            <span>閱讀更多</span>
            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

