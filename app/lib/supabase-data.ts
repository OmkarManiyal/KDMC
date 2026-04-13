import { Article, Category, SiteSettings } from './types';
import { createClient as createSupabaseClient } from './supabase-server';

export interface ArticleWithCategory extends Article {
  categories?: Category;
}

export async function getAllArticles(): Promise<Article[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return data;
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', categorySlug)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }

  return data || [];
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }

  return data || [];
}

export async function getTrendingArticles(): Promise<Article[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('trending', true)
    .order('created_at', { ascending: false })
    .limit(4);

  if (error) {
    console.error('Error fetching trending articles:', error);
    return [];
  }

  return data || [];
}

export async function getLatestArticles(limit: number = 6): Promise<Article[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }

  return data || [];
}

export async function searchArticles(query: string): Promise<Article[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching articles:', error);
    return [];
  }

  return data || [];
}

export async function getRelatedArticles(category: string, currentSlug: string, limit: number = 3): Promise<Article[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }

  return data || [];
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');

  if (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }

  const settings: Record<string, string> = {};
  data?.forEach((item) => {
    settings[item.key] = item.value;
  });

  return settings as unknown as SiteSettings;
}

export async function getArticleCountByCategory(): Promise<Record<string, number>> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('category')
    .eq('status', 'published');

  if (error) {
    console.error('Error counting articles:', error);
    return {};
  }

  const count: Record<string, number> = {};
  data?.forEach((article) => {
    count[article.category] = (count[article.category] || 0) + 1;
  });

  return count;
}

export async function getArchiveList(): Promise<{ year: number; month: number; count: number }[]> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('articles')
    .select('created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching archive:', error);
    return [];
  }

  const archive: Record<string, number> = {};
  data?.forEach((article) => {
    const date = new Date(article.created_at);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    archive[key] = (archive[key] || 0) + 1;
  });

  return Object.entries(archive).map(([key, count]) => {
    const [year, month] = key.split('-').map(Number);
    return { year, month, count };
  });
}

export async function getArticlesByArchive(year: number, month: number): Promise<Article[]> {
  const supabase = await createSupabaseClient();
  const startDate = new Date(year, month, 1).toISOString();
  const endDate = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching archive articles:', error);
    return [];
  }

  return data || [];
}
