import { getBlogPosts } from '@/lib/blog';
import ArticleCard from '@/components/ArticleCard';

export default function TechBlogPage() {
  const posts = getBlogPosts('tech');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            💻 技術文章
          </h1>
          <p className="text-gray-600 text-lg">
            分享技術學習和開發經驗
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg text-center">
            <p className="text-gray-500 text-lg">還沒有文章，敬請期待！</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} category="tech" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

