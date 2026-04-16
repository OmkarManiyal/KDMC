'use client';

import Link from 'next/link';
import { siteSettings } from '@/app/lib/site-settings';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, Newspaper } from 'lucide-react';
import SearchBar from './SearchBar';
import { createClient } from '@/app/lib/supabase-client';
import { Category } from '@/app/lib/types';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      if (data) {
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 ${
        isScrolled ? 'shadow-md py-2' : 'py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-900 dark:bg-blue-800 rounded-lg flex items-center justify-center group-hover:bg-blue-800 dark:group-hover:bg-blue-700 transition-colors">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {siteSettings.site_name}
              </span>
              <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 font-medium">
                by {siteSettings.editor_name}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === '/'
                  ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-slate-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === `/category/${category.slug}`
                    ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-slate-800'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mt-4 animate-in">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}

        <nav
          className={`lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-slate-800 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col gap-1 pt-4">
            <Link
              href="/"
              className={`px-4 py-2.5 rounded-lg font-semibold transition-colors ${
                pathname === '/'
                  ? 'bg-blue-900 dark:bg-blue-800 text-white'
                  : 'text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`px-4 py-2.5 rounded-lg font-semibold transition-colors ${
                  pathname === `/category/${category.slug}`
                    ? 'bg-blue-900 dark:bg-blue-800 text-white'
                    : 'text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
