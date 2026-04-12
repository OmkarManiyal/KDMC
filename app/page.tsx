import Image from 'next/image';
import Link from 'next/link';
import {
  Header,
  Footer,
  ArticleCard,
  CategoryCard,
  EditorProfile,
  Newsletter,
  BreakingNewsTicker,
} from '@/app/components';
import {
  getFeaturedArticles,
  getLatestArticles,
  getTrendingArticles,
  getAllCategories,
} from '@/app/lib/data';
import { siteSettings } from '@/app/lib/site-settings';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const latestArticles = getLatestArticles(6);
  const trendingArticles = getTrendingArticles();
  const categories = getAllCategories();

  return (
    <>
      <Header />
      <BreakingNewsTicker />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                        <Image
                          src={siteSettings.editorAvatar}
                          alt={siteSettings.editorName}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-bold">ED</span>
                      </div>
                    </div>
                    <p className="mt-6 text-accent-light font-mono text-xs uppercase tracking-widest">
                      From the Editor
                    </p>
                    <h2 className="mt-2 text-2xl font-serif font-bold">
                      {siteSettings.editorName}
                    </h2>
                    <p className="text-white/70 text-sm">
                      {siteSettings.editorRole}
                    </p>
                    <blockquote className="mt-4 text-white/90 italic text-sm border-l-4 border-accent pl-4 text-left w-full">
                      {siteSettings.editorMessage}
                    </blockquote>
                    <div className="mt-6 flex gap-3">
                      <Link href="/category/news" className="btn-primary text-sm px-5 py-2">
                        Latest News
                      </Link>
                      <Link href="/category/announcements" className="btn-secondary text-sm px-5 py-2 border-white text-white hover:bg-white hover:text-primary">
                        Announcements
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 order-1 lg:order-2">
                {featuredArticles.length > 0 && (
                  <ArticleCard article={featuredArticles[0]} variant="featured" />
                )}
              </div>
            </div>
          </section>

          {trendingArticles.length > 0 && (
            <section className="py-12 border-t border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <h2 className="section-title">Trending in Your Area</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </section>
          )}

          <section className="py-12 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">Latest News</h2>
              <Link
                href="/category/news"
                className="flex items-center gap-2 text-primary dark:text-accent font-medium hover:gap-3 transition-all"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          <section className="py-12 border-t border-gray-100 dark:border-slate-800">
            <h2 className="section-title mb-8">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  description={category.description}
                  color={category.color}
                  icon={category.icon}
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
