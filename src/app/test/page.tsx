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
    fetch('http://localhost:3001/api/health')
      .then(response => response.json())
      .then(data => {
        setApiStatus('API is running: ' + JSON.stringify(data));
      })
      .catch(error => {
        setApiStatus('API error: ' + error.message);
      });

    // Test products fetch
    dispatch(fetchProducts({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">API Status:</h2>
          <p className="text-sm">{apiStatus}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Products Status:</h2>
          {isLoading && <p>Loading products...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {items.length > 0 && (
            <div>
              <p>Found {items.length} products:</p>
              <ul className="list-disc pl-5">
                {items.map(product => (
                  <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 