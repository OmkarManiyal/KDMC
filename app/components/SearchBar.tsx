'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { createClient } from '@/app/lib/supabase-client';
import { Article } from '@/app/lib/types';
import { formatDateShort } from '@/app/lib/utils';

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

export default function SearchBar({ onClose, autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    async function search() {
      if (query.length >= 2) {
        const supabase = createClient();
        const { data } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
          .order('created_at', { ascending: false })
          .limit(5);
        setResults(data || []);
      } else {
        setResults([]);
      }
    }
    search();
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div
        className={`relative flex items-center transition-all duration-200 ${
          isFocused ? 'ring-2 ring-blue-500' : ''
        } rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
      >
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search articles, news, announcements..."
          className="w-full pl-12 pr-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none rounded-lg"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {results.length > 0 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in">
          {results.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              onClick={onClose}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {article.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDateShort(article.created_at)} • {article.category.replace('-', ' ')}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            View all results <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {query.length >= 2 && results.length === 0 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center z-50">
          <p className="text-gray-500 dark:text-gray-400">
            No articles found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </form>
  );
}
