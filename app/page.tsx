import Image from 'next/image';
import Link from 'next/link';
import {
  Header,
  Footer,
  ArticleCard,
  CategoryCard,
  Newsletter,
  BreakingNewsTicker,
} from '@/app/components';
import {
  getFeaturedArticles,
  getLatestArticles,
  getTrendingArticles,
  getAllCategories,
  getSiteSettings,
} from '@/app/lib/supabase-data';
import { siteSettings as fallbackSettings } from '@/app/lib/site-settings';
import { ArrowRight, TrendingUp } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [featuredArticles, latestArticles, trendingArticles, categories, siteSettingsData] = 
    await Promise.all([
      getFeaturedArticles(),
      getLatestArticles(6),
      getTrendingArticles(),
      getAllCategories(),
      getSiteSettings(),
    ]);

  const settings = siteSettingsData || fallbackSettings;

  return (
    <>
      <Header />
      <BreakingNewsTicker />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-8 text-white h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                        <Image
                          src={settings.editor_avatar || fallbackSettings.editor_avatar}
                          alt={settings.editor_name || fallbackSettings.editor_name}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-bold">ED</span>
                      </div>
                    </div>
                    <p className="mt-6 text-blue-200 font-mono text-xs uppercase tracking-widest font-semibold">
                      From the Editor
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                      {settings.editor_name || fallbackSettings.editor_name}
                    </h2>
                    <p className="text-white/80 text-sm font-medium">
                      {settings.editor_role || fallbackSettings.editor_role}
                    </p>
                    <blockquote className="mt-4 text-white/90 italic text-sm border-l-4 border-red-500 pl-4 text-left w-full">
                      {settings.editor_message || fallbackSettings.editor_message}
                    </blockquote>
                    <div className="mt-6 flex gap-3">
                      <Link href="/category/news" className="bg-white text-blue-900 hover:bg-blue-50 text-sm px-5 py-2 rounded-lg font-bold transition-colors">
                        Latest News
                      </Link>
                      <Link href="/category/announcements" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 text-sm px-5 py-2 rounded-lg font-bold transition-colors">
                        Announcements
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 order-1 lg:order-2">
                {featuredArticles.length > 0 ? (
                  <ArticleCard article={featuredArticles[0]} variant="featured" />
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-400 font-medium">
                      No featured articles yet. Create one from the admin panel!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {trendingArticles.length > 0 && (
            <section className="py-12 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Trending in Your Area
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </section>
          )}

          <section className="py-12 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Latest News
              </h2>
              <Link
                href="/category/news"
                className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-400 font-medium">
                  No articles yet. Check back soon!
                </p>
              </div>
            )}
          </section>

          <section className="py-12 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  description={category.description || ''}
                  color={category.color || '#1E3A5F'}
                  icon={category.icon || 'Newspaper'}
                />
              ))}
            </div>
          </section>

          <section className="py-12">
            <Newsletter />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
