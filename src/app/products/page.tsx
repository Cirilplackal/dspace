'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProducts, setFilters } from '@/store/slices/productsSlice';
import { ProductGrid } from '@/components/products/ProductGrid';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { PriceFilter } from '@/components/ui/PriceFilter';
import { SortSelect } from '@/components/ui/SortSelect';
import { Pagination } from '@/components/ui/Pagination';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { objectToSearchParams } from '@/lib/utils';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  
  const { items: products, isLoading, pagination, filters } = useAppSelector(
    (state) => state.products
  );

  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Parse search params
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const params = {
      q: debouncedSearch,
      category,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy: sortBy as any,
      sortOrder: sortOrder as 'asc' | 'desc',
      page,
      limit,
    };

    dispatch(setFilters(params));
    dispatch(fetchProducts(params));
  }, [dispatch, debouncedSearch, category, minPrice, maxPrice, sortBy, sortOrder, page, limit]);

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams);
    if (min) {
      params.set('minPrice', min);
    } else {
      params.delete('minPrice');
    }
    if (max) {
      params.set('maxPrice', max);
    } else {
      params.delete('maxPrice');
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (sort: string, order: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', sort);
    params.set('sortOrder', order);
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push('/products');
  };

  const hasActiveFilters = query || category || minPrice || maxPrice || sortBy !== 'createdAt' || sortOrder !== 'desc';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-6">
        <SearchBar onSearch={handleSearch} placeholder="Search products..." defaultValue={query} />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CategoryFilter onCategoryChange={handleCategoryChange} value={category} />
          <PriceFilter onPriceChange={handlePriceChange} minPrice={minPrice} maxPrice={maxPrice} />
          <SortSelect onSortChange={handleSortChange} sortBy={sortBy} sortOrder={sortOrder} />
        </div>
      </div>

      {/* Results Summary */}
      {!isLoading && (
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.total)} of {pagination.total} products
          </span>
          {hasActiveFilters && (
            <span className="text-blue-600 dark:text-blue-400">
              Filtered results
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : products?.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          title="No products found"
          description="Try adjusting your search or filter criteria"
          action={
            <button
              onClick={handleClearFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          }
        />
      )}

      {/* Pagination */}
      {!isLoading && pagination?.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination?.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
} 