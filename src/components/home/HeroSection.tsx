'use client';

import { SearchBar } from '@/components/ui/SearchBar';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover Amazing Products
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Find the best deals on thousands of products with our powerful search and filtering system
        </p>
        
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            onSearch={onSearch} 
            placeholder="What are you looking for?"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/70"
          />
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">Electronics</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">Fashion</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">Home & Garden</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">Sports</span>
        </div>
      </div>
    </section>
  );
} 