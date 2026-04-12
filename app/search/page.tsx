import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer, ArticleCard, Newsletter, SearchBar } from '@/app/components';
import { searchArticles } from '@/app/lib/data';
import { Search, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search articles on KDMC News',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage(props: SearchPageProps) {
  const { q } = await props.searchParams;
  const query = q || '';
  const results = query ? searchArticles(query) : [];

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-primary dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white">Search</span>
          </nav>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Search Articles
            </h1>
            <SearchBar autoFocus />
          </div>

          {query && (
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400">
                {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
              </p>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                No results found
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                We couldn&apos;t find any articles matching &quot;{query}&quot;
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Start searching
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Enter keywords to search for articles
              </p>
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
