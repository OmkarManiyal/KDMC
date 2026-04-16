'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/app/lib/supabase-client';
import { Article } from '@/app/lib/types';
import { ExternalLink } from 'lucide-react';

export default function BreakingNewsTicker() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      const supabase = createClient();
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);
      if (data) {
        setArticles(data);
      }
    }
    fetchArticles();
  }, []);

  if (articles.length === 0) return null;

  return (
    <div
      className="bg-red-600 dark:bg-red-800 text-white py-2 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="flex-shrink-0 bg-white text-red-600 px-3 py-1 rounded font-bold text-xs uppercase tracking-wider">
            Latest
          </span>
          <div className="flex-1 overflow-hidden">
            <div
              className={`flex gap-8 ${isPaused ? '' : 'animate-ticker'}`}
              style={{
                animation: isPaused ? 'none' : 'ticker 30s linear infinite',
                width: 'max-content',
              }}
            >
              {[...articles, ...articles].map((article, idx) => (
                <Link
                  key={`${article.id}-${idx}`}
                  href={`/news/${article.slug}`}
                  className="flex items-center gap-2 text-sm font-medium hover:text-white/80 transition-colors flex-shrink-0"
                >
                  <span className="text-white/70">
                    <ExternalLink className="w-3 h-3 inline" />
                  </span>
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
