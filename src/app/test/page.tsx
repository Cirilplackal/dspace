'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProducts } from '@/store/slices/productsSlice';

export default function TestPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.products);
  const [apiStatus, setApiStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Test API health
    fetch('/api/health')
      .then(response => response.json())
      .then(data => {
        setApiStatus('API is running: ' + JSON.stringify(data, null, 2));
      })
      .catch(error => {
        setApiStatus('API error: ' + error.message);
      });

    // Test products fetch
    dispatch(fetchProducts({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Next.js Fullstack Test Page</h1>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">API Health Status:</h2>
          <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-auto">
            {apiStatus}
          </pre>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Products API Test:</h2>
          {isLoading && <p className="text-blue-600">Loading products...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {items.length > 0 && (
            <div>
              <p className="text-green-600 mb-2">✅ Found {items.length} products:</p>
              <ul className="list-disc pl-5 space-y-1">
                {items.map(product => (
                  <li key={product.id} className="text-sm">
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Next.js Fullstack Features:</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>✅ API Routes (Next.js built-in)</li>
            <li>✅ Server Components</li>
            <li>✅ Client Components</li>
            <li>✅ Authentication with JWT</li>
            <li>✅ Redux Toolkit integration</li>
            <li>✅ TypeScript support</li>
            <li>✅ Tailwind CSS styling</li>
            <li>✅ Environment variables</li>
            <li>✅ Security headers</li>
            <li>✅ Error handling</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 