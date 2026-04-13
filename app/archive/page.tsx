import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer, Newsletter } from '@/app/components';
import { Calendar, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse all articles by month and year',
};

export default function ArchivePage() {
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
            <span className="text-gray-900 dark:text-white">Archive</span>
          </nav>

          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                <Calendar className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold">
                  Article Archive
                </h1>
                <p className="mt-2 text-white/80">
                  Browse all our articles organized by month and year
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Archive Coming Soon
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Articles will be organized by date as they are published.
            </p>
          </div>

          <section className="mt-16">
            <Newsletter />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
