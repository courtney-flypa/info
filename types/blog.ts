export type BlogCategory = 'travel' | 'tech';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: BlogCategory;
  content: string;
  htmlContent?: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: BlogCategory;
}

