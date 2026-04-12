import Link from 'next/link';
import { Header, Footer } from '@/app/components';
import { Home, Search, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <FileQuestion className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-primary flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link href="/search" className="btn-secondary flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
