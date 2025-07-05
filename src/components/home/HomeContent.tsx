'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchBar } from '@/components/ui/SearchBar';

export function HomeContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query)}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to DSpace
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your modern e-commerce platform
          </p>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="What are you looking for?"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/70"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Browse Products
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore our collection of amazing products
          </p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Products
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Sign In
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Access your account and manage orders
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Sign In
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Create Account
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join us and start shopping today
          </p>
          <button
            onClick={() => router.push('/auth/register')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* Test API Connection */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          API Status
        </h3>
        <button
          onClick={() => router.push('/test')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Test API Connection
        </button>
      </section>
    </div>
  );
} 