import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Header,
  Footer,
  ArticleCard,
  Newsletter,
} from '@/app/components';
import {
  getAllCategories,
  getCategoryBySlug,
  getArticlesByCategory,
} from '@/app/lib/data';
import { Category } from '@/app/lib/types';
import Link from 'next/link';
import { ChevronRight, Newspaper, Megaphone, Building, FileText, Calendar } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Newspaper: <Newspaper className="w-8 h-8" />,
  Megaphone: <Megaphone className="w-8 h-8" />,
  Building: <Building className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  Calendar: <Calendar className="w-8 h-8" />,
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} | KDMC News`,
      description: category.description,
    },
  };
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { slug } = await props.params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(slug);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-primary dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white">{category.name}</span>
          </nav>

          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="flex items-center gap-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${category.color}30`, color: 'white' }}
              >
                {iconMap[category.icon] || iconMap.Newspaper}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold">
                  {category.name}
                </h1>
                <p className="mt-2 text-white/80 max-w-2xl">
                  {category.description}
                </p>
                <p className="mt-2 text-white/60 text-sm">
                  {articles.length} article{articles.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Newspaper className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                No articles yet
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                There are no published articles in this category yet.
              </p>
              <Link href="/" className="btn-primary mt-6 inline-block">
                Back to Home
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
