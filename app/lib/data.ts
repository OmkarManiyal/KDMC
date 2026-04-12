import { Article, Category, Subscriber } from './types';
import articlesData from '@/content/articles/articles.json';
import categoriesData from '@/content/categories/categories.json';

const articles: Article[] = articlesData as Article[];
const categories: Category[] = categoriesData as Category[];

export function getAllArticles(): Article[] {
  return articles.filter((a) => a.status === 'published');
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug && a.status === 'published');
}

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter(
    (a) => a.category === categorySlug && a.status === 'published'
  );
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured && a.status === 'published');
}

export function getTrendingArticles(): Article[] {
  return articles
    .filter((a) => a.trending && a.status === 'published')
    .slice(0, 4);
}

export function getLatestArticles(limit: number = 6): Article[] {
  return articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.status === 'published' &&
      (a.title.toLowerCase().includes(lowerQuery) ||
        a.excerpt.toLowerCase().includes(lowerQuery) ||
        a.content.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedArticles(currentSlug: string, category: string, limit: number = 3): Article[] {
  return articles
    .filter((a) => a.category === category && a.slug !== currentSlug && a.status === 'published')
    .slice(0, limit);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryColor(categorySlug: string): string {
  const category = categories.find((c) => c.slug === categorySlug);
  return category?.color || '#1E3A5F';
}

export function getArchiveList(): { year: number; month: number; count: number }[] {
  const archive: Record<string, number> = {};
  
  articles
    .filter((a) => a.status === 'published')
    .forEach((a) => {
      const date = new Date(a.publishedAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      archive[key] = (archive[key] || 0) + 1;
    });

  return Object.entries(archive)
    .map(([key, count]) => {
      const [year, month] = key.split('-').map(Number);
      return { year, month, count };
    })
    .sort((a, b) => b.year - a.year || b.month - a.month);
}

export function getArticlesByArchive(year: number, month: number): Article[] {
  return articles.filter((a) => {
    const date = new Date(a.publishedAt);
    return (
      a.status === 'published' &&
      date.getFullYear() === year &&
      date.getMonth() === month
    );
  });
}

export function getTotalStats() {
  return {
    totalArticles: articles.filter((a) => a.status === 'published').length,
    totalCategories: categories.length,
    draftArticles: articles.filter((a) => a.status === 'draft').length,
  };
}
