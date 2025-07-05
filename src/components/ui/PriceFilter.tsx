'use client';

interface PriceFilterProps {
  onPriceChange: (min: string, max: string) => void;
  minPrice?: string;
  maxPrice?: string;
}

export function PriceFilter({ onPriceChange, minPrice = '', maxPrice = '' }: PriceFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Price Range
      </label>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => onPriceChange(e.target.value, maxPrice)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="flex items-center text-gray-500">-</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => onPriceChange(minPrice, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
} 