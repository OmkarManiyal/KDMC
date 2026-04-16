import { Article, Category, SiteSettings } from './types';
import { createClient as createSupabaseClient } from './supabase-server';

function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export interface ArticleWithCategory extends Article {
  categories?: Category;
}

const fallbackArticles: Article[] = [
  {
    id: '1',
    slug: 'kdmc-launches-new-digital-portal-citizen-services',
    title: 'KDMC Launches New Digital Portal for Citizen Services',
    excerpt: 'The Kalyan Dombivli Municipal Corporation has unveiled a comprehensive digital portal to streamline citizen services and reduce paperwork.',
    content: 'The Kalyan Dombivli Municipal Corporation (KDMC) has launched a new digital portal aimed at transforming the way citizens access municipal services. The portal, inaugurated by Municipal Commissioner Dr. Rajesh Kumar, offers over 50 services online including property tax payments, birth/death certificates, and building permission applications.\n\nThe initiative is part of KDMC\'s smart city vision and aims to reduce processing time by 60% while eliminating the need for citizens to visit municipal offices multiple times.',
    category: 'news',
    featured_image: '',
    author: 'Vijay Maniyal',
    created_at: '2026-04-10T10:00:00Z',
    updated_at: '2026-04-10T10:00:00Z',
    read_time: 3,
    status: 'published',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    slug: 'monsoon-preparation-drive-kdmc-2026',
    title: 'KDMC Begins Monsoon Preparation Drive',
    excerpt: 'Municipal authorities have begun comprehensive preparations to tackle the upcoming monsoon season with improved drainage systems.',
    content: 'With the monsoon season approaching, KDMC has launched a comprehensive preparation drive to prevent waterlogging and ensure smooth drainage across the city. The municipal corporation has allocated Rs. 50 crore for desilting drains, repairing stormwater pipes, and clearing blocked nalas.\n\nOver 200 workers have been deployed across 50 locations to carry out the pre-monsoon work which is expected to be completed by mid-May.',
    category: 'announcements',
    featured_image: '',
    author: 'Vijay Maniyal',
    created_at: '2026-04-08T14:30:00Z',
    updated_at: '2026-04-08T14:30:00Z',
    read_time: 4,
    status: 'published',
    featured: false,
    trending: true,
  },
  {
    id: '3',
    slug: 'new-metro-line-connectivity-kalyan-dombivli',
    title: 'New Metro Line to Improve Kalyan-Dombivli Connectivity',
    excerpt: 'The Maharashtra government has approved a new metro line that will significantly improve connectivity between Kalyan and Dombivli areas.',
    content: 'In a major boost to public transportation, the Maharashtra government has approved the construction of a new metro line connecting Kalyan and Dombivli. The 12-kilometer corridor will have 10 stations and is expected to serve over 2 lakh commuters daily.\n\nThe project, estimated to cost Rs. 3,500 crore, is expected to be completed within three years and will feature modern amenities including CCTV surveillance, Wi-Fi connectivity, and escalators at all stations.',
    category: 'news',
    featured_image: '',
    author: 'Vijay Maniyal',
    created_at: '2026-04-05T09:00:00Z',
    updated_at: '2026-04-05T09:00:00Z',
    read_time: 5,
    status: 'published',
    featured: false,
    trending: false,
  },
  {
    id: '4',
    slug: 'kdmc-property-tax-collection-2025',
    title: 'KDMC Property Tax Collection Drive Shows Positive Results',
    excerpt: 'The municipal corporation has collected 15% more property tax this year compared to the same period last year.',
    content: 'KDMC\'s property tax collection drive for 2025-26 has shown impressive results with a 15% increase compared to the previous year. The municipal corporation collected Rs. 450 crore in the first quarter itself.\n\nOfficials attribute this success to the online payment facilities and the user-friendly property tax calculator introduced on the municipal website.',
    category: 'announcements',
    featured_image: '',
    author: 'Vijay Maniyal',
    created_at: '2026-03-28T11:00:00Z',
    updated_at: '2026-03-28T11:00:00Z',
    read_time: 3,
    status: 'published',
    featured: false,
    trending: false,
  },
];

const fallbackCategories: Category[] = [
  { id: '1', slug: 'news', name: 'News', description: 'Latest news and updates', color: 'blue', icon: 'newspaper' },
  { id: '2', slug: 'announcements', name: 'Announcements', description: 'Official announcements', color: 'green', icon: 'megaphone' },
  { id: '3', slug: 'events', name: 'Events', description: 'Upcoming events', color: 'purple', icon: 'calendar' },
  { id: '4', slug: 'public-notices', name: 'Public Notices', description: 'Public notices and alerts', color: 'red', icon: 'alert' },
];

export async function getAllArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return fallbackArticles;
  }
  
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return fallbackArticles;
    }

    return data || fallbackArticles;
  } catch {
    return fallbackArticles;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    return fallbackArticles.find(a => a.slug === slug) || null;
  }
  
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      return fallbackArticles.find(a => a.slug === slug) || null;
    }

    return data;
  } catch {
    return fallbackArticles.find(a => a.slug === slug) || null;
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return fallbackArticles.filter(a => a.category === categorySlug);
  }
  
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', categorySlug)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles by category:', error);
      return fallbackArticles.filter(a => a.category === categorySlug);
    }

    return data || fallbackArticles.filter(a => a.category === categorySlug);
  } catch {
    return fallbackArticles.filter(a => a.category === categorySlug);
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return fallbackArticles.filter(a => a.featured);
  }
  
  try {
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
      return fallbackArticles.filter(a => a.featured);
    }

    return data || fallbackArticles.filter(a => a.featured);
  } catch {
    return fallbackArticles.filter(a => a.featured);
  }
}

export async function getTrendingArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return fallbackArticles.filter(a => a.trending);
  }
  
  try {
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
      return fallbackArticles.filter(a => a.trending);
    }

    return data || fallbackArticles.filter(a => a.trending);
  } catch {
    return fallbackArticles.filter(a => a.trending);
  }
}

export async function getLatestArticles(limit: number = 6): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return fallbackArticles.slice(0, limit);
  }
  
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching latest articles:', error);
      return fallbackArticles.slice(0, limit);
    }

    return data || fallbackArticles.slice(0, limit);
  } catch {
    return fallbackArticles.slice(0, limit);
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    const q = query.toLowerCase();
    return fallbackArticles.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.content.toLowerCase().includes(q)
    );
  }
  
  try {
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
  } catch {
    return [];
  }
}

export async function getRelatedArticles(category: string, currentSlug: string, limit: number = 3): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return fallbackArticles.filter(a => a.category === category && a.slug !== currentSlug).slice(0, limit);
  }
  
  try {
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
      return fallbackArticles.filter(a => a.category === category && a.slug !== currentSlug).slice(0, limit);
    }

    return data || fallbackArticles.filter(a => a.category === category && a.slug !== currentSlug).slice(0, limit);
  } catch {
    return fallbackArticles.filter(a => a.category === category && a.slug !== currentSlug).slice(0, limit);
  }
}

export async function getAllCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return fallbackCategories;
  }
  
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return fallbackCategories;
    }

    return data || fallbackCategories;
  } catch {
    return fallbackCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return fallbackCategories.find(c => c.slug === slug) || null;
  }
  
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return fallbackCategories.find(c => c.slug === slug) || null;
    }

    return data;
  } catch {
    return fallbackCategories.find(c => c.slug === slug) || null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }
  
  try {
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
  } catch {
    return null;
  }
}

export async function getArticleCountByCategory(): Promise<Record<string, number>> {
  if (!isSupabaseConfigured()) {
    const count: Record<string, number> = {};
    fallbackArticles.forEach((article) => {
      count[article.category] = (count[article.category] || 0) + 1;
    });
    return count;
  }
  
  try {
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
  } catch {
    return {};
  }
}

export async function getArchiveList(): Promise<{ year: number; month: number; count: number }[]> {
  if (!isSupabaseConfigured()) {
    const archive: Record<string, number> = {};
    fallbackArticles.forEach((article) => {
      const date = new Date(article.created_at);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      archive[key] = (archive[key] || 0) + 1;
    });
    return Object.entries(archive).map(([key, count]) => {
      const [year, month] = key.split('-').map(Number);
      return { year, month, count };
    });
  }
  
  try {
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
  } catch {
    return [];
  }
}

export async function getArticlesByArchive(year: number, month: number): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return fallbackArticles.filter((article) => {
      const date = new Date(article.created_at);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  }
  
  try {
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
  } catch {
    return [];
  }
}
