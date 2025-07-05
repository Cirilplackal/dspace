import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with real database
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    images: ['https://via.placeholder.com/300x200?text=Headphones'],
    inStock: true,
    rating: 4.5,
    reviewCount: 120,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    category: 'Electronics',
    images: ['https://via.placeholder.com/300x200?text=Smart+Watch'],
    inStock: true,
    rating: 4.2,
    reviewCount: 85,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Laptop Stand',
    description: 'Ergonomic laptop stand for better posture',
    price: 49.99,
    category: 'Accessories',
    images: ['https://via.placeholder.com/300x200?text=Laptop+Stand'],
    inStock: true,
    rating: 4.7,
    reviewCount: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'Premium mechanical keyboard with RGB lighting',
    price: 149.99,
    category: 'Accessories',
    images: ['https://via.placeholder.com/300x200?text=Keyboard'],
    inStock: false,
    rating: 4.8,
    reviewCount: 156,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with customizable DPI',
    price: 79.99,
    category: 'Accessories',
    images: ['https://via.placeholder.com/300x200?text=Mouse'],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log('API Products route called');
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category') || '';
    const q = searchParams.get('q') || '';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Filter products
    let filteredProducts = products.filter(product => {
      const matchesCategory = !category || product.category.toLowerCase() === category.toLowerCase();
      const matchesSearch = !q || product.name.toLowerCase().includes(q.toLowerCase()) || 
                           product.description.toLowerCase().includes(q.toLowerCase());
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      
      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sort products
    filteredProducts.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a];
      let bValue: any = b[sortBy as keyof typeof b];
      
      if (sortBy === 'price' || sortBy === 'rating' || sortBy === 'reviewCount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);

    const response = {
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        }
      },
      message: 'Products retrieved successfully',
      status: 200
    };
    console.log('API Products response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Products error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 