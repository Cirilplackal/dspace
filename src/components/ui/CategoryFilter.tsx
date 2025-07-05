'use client';

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
  value?: string;
}

const categories = [
  { id: '', name: 'All Categories' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'sports', name: 'Sports' },
  { id: 'books', name: 'Books' },
  { id: 'toys', name: 'Toys & Games' },
  { id: 'health', name: 'Health & Beauty' },
];

export function CategoryFilter({ onCategoryChange, value = '' }: CategoryFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Category
      </label>
      <select
        value={value}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
} 