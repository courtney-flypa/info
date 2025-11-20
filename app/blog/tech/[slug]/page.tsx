import { getBlogPostBySlug, getAllBlogPostSlugs } from '@/lib/blog';
import ArticleContent from '@/components/ArticleContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  const slugs = getAllBlogPostSlugs('tech');
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function TechPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug('tech', slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog/tech"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
        >
          <span>←</span>
          <span>返回技術文章列表</span>
        </Link>
        <ArticleContent post={post} />
      </div>
    </div>
  );
}

