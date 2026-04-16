'use client';

import { useEffect, useState } from 'react';
import { Header, Footer, ArticleCard, Newsletter } from '@/app/components';
import { Article, Category } from '@/app/lib/types';
import { createClient } from '@/app/lib/supabase-client';
import { Inbox, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const categoryMeta: Record<string, { title: string; description: string }> = {
  'news': { title: 'News', description: 'Latest local news and breaking stories from KDMC' },
  'announcements': { title: 'Announcements', description: 'Official announcements from municipal authorities' },
  'civic-updates': { title: 'Civic Updates', description: 'Infrastructure, services, and civic development news' },
  'public-notices': { title: 'Public Notices', description: 'Official public notices and legal announcements' },
  'events': { title: 'Events', description: 'Community events, festivals, and local happenings' },
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      const supabase = createClient();

      const [categoryResult, articlesResult] = await Promise.all([
        supabase
          .from('categories')
          .select('*')
          .eq('slug', params.slug)
          .single(),
        supabase
          .from('articles')
          .select('*')
          .eq('category', params.slug)
          .eq('status', 'published')
          .order('created_at', { ascending: false }),
      ]);

      if (categoryResult.data) {
        setCategory(categoryResult.data);
      }

      if (articlesResult.error) {
        setError('Failed to load articles. Please try again later.');
      } else {
        setArticles(articlesResult.data || []);
      }

      setLoading(false);
    }

    fetchData();
  }, [params.slug]);

  const meta = categoryMeta[params.slug] || {
    title: params.slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: `Articles in ${params.slug}`,
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </nav>

          <header className="mb-12">
            <p className="text-accent font-medium uppercase tracking-wider text-sm mb-2">
              Category
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {category?.name || meta.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {category?.description || meta.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
          </header>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-slate-700 h-56 rounded-2xl mb-4" />
                  <div className="bg-gray-200 dark:bg-slate-700 h-6 rounded w-3/4 mb-3" />
                  <div className="bg-gray-200 dark:bg-slate-700 h-4 rounded w-full mb-2" />
                  <div className="bg-gray-200 dark:bg-slate-700 h-4 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Articles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No articles found in this category yet. Check back soon!
              </p>
              <Link
                href="/admin/new"
                className="inline-block mt-4 text-accent hover:underline font-medium"
              >
                Create the first article →
              </Link>
            </div>
          )}

          <section className="mt-16">
            <Newsletter />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
