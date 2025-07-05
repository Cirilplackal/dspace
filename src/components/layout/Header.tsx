'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleSidebar, toggleTheme } from '@/store/slices/uiSlice';
import { logoutUser } from '@/store/slices/authSlice';
import { SearchBar } from '@/components/ui/SearchBar';
import { UserMenu } from '@/components/ui/UserMenu';
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  Sun, 
  Moon,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { theme, sidebarOpen } = useAppSelector((state) => state.ui);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSidebarToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                DSpace
              </span>
            </Link>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <SearchBar onSearch={handleSearch} placeholder="Search products..." />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User menu */}
            {isLoading ? (
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            ) : user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile search */}
        {showSearch && (
          <div className="pb-4 md:hidden">
            <SearchBar onSearch={handleSearch} placeholder="Search products..." />
          </div>
        )}
      </div>
    </header>
  );
} 