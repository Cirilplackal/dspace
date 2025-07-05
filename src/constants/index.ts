// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Application Configuration
export const APP_CONFIG = {
  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  
  // Sorting
  DEFAULT_SORT_BY: 'createdAt' as const,
  DEFAULT_SORT_ORDER: 'desc' as const,
  
  // Search
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_LENGTH: 100,
  
  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Authentication
  TOKEN_EXPIRY: '7d',
  REFRESH_TOKEN_EXPIRY: '30d',
  
  // Validation
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  
  // UI
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  LOADING_TIMEOUT: 10000,
  
  // Categories
  CATEGORIES: [
    { id: '', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'sports', name: 'Sports' },
    { id: 'books', name: 'Books' },
    { id: 'toys', name: 'Toys & Games' },
    { id: 'health', name: 'Health & Beauty' },
  ],
  
  // Sort Options
  SORT_OPTIONS: [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'createdAt', label: 'Date Added' },
  ],
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar_state',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
    TRENDING: '/products/trending',
    RELATED: (id: string) => `/products/${id}/related`,
    REVIEWS: (id: string) => `/products/${id}/reviews`,
    UPLOAD_IMAGES: (id: string) => `/products/${id}/images`,
    DELETE_IMAGE: (id: string) => `/products/${id}/images`,
    UPDATE_STOCK: (id: string) => `/products/${id}/stock`,
  },
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: string) => `/categories/${id}`,
    PRODUCTS: (id: string) => `/categories/${id}/products`,
  },
  HEALTH: '/health',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in.',
  REGISTER_SUCCESS: 'Account created successfully.',
  LOGOUT_SUCCESS: 'Successfully logged out.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PRODUCT_CREATED: 'Product created successfully.',
  PRODUCT_UPDATED: 'Product updated successfully.',
  PRODUCT_DELETED: 'Product deleted successfully.',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// UI Constants
export const UI = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  NOTIFICATION_DURATION: 5000,
  ANIMATION_DURATION: 200,
} as const;

// Theme Colors
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/profile',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ADMIN: '/admin',
} as const; 