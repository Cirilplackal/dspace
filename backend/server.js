const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

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
  }
];

const categories = [
  { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets' },
  { id: 2, name: 'Accessories', description: 'Computer and phone accessories' },
  { id: 3, name: 'Clothing', description: 'Fashion and apparel' }
];

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  // Mock authentication - in real app, you'd check against database
  if (email === 'john@example.com' && password === 'password123') {
    const user = users.find(u => u.email === email);
    res.json({
      success: true,
      data: {
        user,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now()
      },
      message: 'Login successful',
      status: 200
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials',
      status: 401
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ 
      success: false, 
      message: 'Passwords do not match' 
    });
  }

  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ 
      success: false, 
      message: 'User already exists' 
    });
  }

  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    avatar: null,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: {
      user: newUser,
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    },
    message: 'Registration successful',
    status: 201
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ 
    success: true, 
    data: null,
    message: 'Logged out successfully',
    status: 200
  });
});

app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({ 
      success: false, 
      message: 'Refresh token is required' 
    });
  }

  // Mock token refresh
  res.json({
    success: true,
    data: {
      token: 'mock-jwt-token-' + Date.now()
    },
    message: 'Token refreshed successfully',
    status: 200
  });
});

app.get('/api/auth/profile', (req, res) => {
  // Mock authentication check
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized' 
    });
  }

  // Return first user as mock profile
  res.json({
    success: true,
    data: users[0],
    message: 'Profile retrieved successfully',
    status: 200
  });
});

// Products endpoints
app.get('/api/products', (req, res) => {
  const { page = 1, limit = 12, category, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  
  let filteredProducts = [...products];
  
  // Apply search filter
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Apply sorting
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    }
    if (sortBy === 'rating') {
      return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: {
      products: paginatedProducts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit)
      }
    }
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ 
      success: false, 
      message: 'Product not found',
      status: 404
    });
  }
  
  res.json({
    success: true,
    data: product,
    message: 'Product retrieved successfully',
    status: 200
  });
});

app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ 
      success: false, 
      message: 'Search query is required' 
    });
  }
  
  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(q.toLowerCase()) ||
    product.description.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    success: true,
    data: searchResults
  });
});

// Categories endpoints
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    data: categories
  });
});

app.get('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const category = categories.find(c => c.id === parseInt(id));
  
  if (!category) {
    return res.status(404).json({ 
      success: false, 
      message: 'Category not found',
      status: 404
    });
  }
  
  res.json({
    success: true,
    data: category,
    message: 'Category retrieved successfully',
    status: 200
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found',
    status: 404
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

const PORT = process.env.BACKEND_PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});