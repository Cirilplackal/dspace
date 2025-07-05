import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState, SearchParams } from '@/types';
import { productsApi } from '@/services/api/productsApi';
import { APP_CONFIG } from '@/constants';

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    limit: APP_CONFIG.DEFAULT_PAGE_SIZE,
    sortBy: APP_CONFIG.DEFAULT_SORT_BY,
    sortOrder: APP_CONFIG.DEFAULT_SORT_ORDER,
  },
  pagination: {
    page: 1,
    limit: APP_CONFIG.DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 0,
  },
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: SearchParams, { rejectWithValue }) => {
    try {
      const response = await productsApi.getProducts(params);
      if (!response?.data) {
        return rejectWithValue('Invalid response from server');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (limit: number = 8, { rejectWithValue }) => {
    try {
      const response = await productsApi.getFeaturedProducts(limit);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured products');
    }
  }
);

export const fetchTrendingProducts = createAsyncThunk(
  'products/fetchTrendingProducts',
  async (limit: number = 6, { rejectWithValue }) => {
    try {
      const response = await productsApi.getTrendingProducts(limit);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue('Product ID is required');
      }
      const response = await productsApi.getProductById(id);
      if (!response?.data) {
        return rejectWithValue('Invalid response from server');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (params: SearchParams, { rejectWithValue }) => {
    try {
      const response = await productsApi.searchProducts(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: Partial<Product>, { rejectWithValue }) => {
    try {
      if (!productData || Object.keys(productData).length === 0) {
        return rejectWithValue('Product data is required');
      }
      const response = await productsApi.createProduct(productData);
      if (!response?.data) {
        return rejectWithValue('Invalid response from server');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }: { id: string; data: Partial<Product> }, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue('Product ID is required');
      }
      if (!data || Object.keys(data).length === 0) {
        return rejectWithValue('Update data is required');
      }
      const response = await productsApi.updateProduct(id, data);
      if (!response?.data) {
        return rejectWithValue('Invalid response from server');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue('Product ID is required');
      }
      await productsApi.deleteProduct(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<SearchParams>>) => {
      state.filters = { ...state.filters, ...action.payload };
      // Reset to first page when filters change
      if (Object.keys(action.payload).some(key => key !== 'page')) {
        state.filters.page = 1;
      }
    },
    clearFilters: (state) => {
      state.filters = {
        page: 1,
        limit: APP_CONFIG.DEFAULT_PAGE_SIZE,
        sortBy: APP_CONFIG.DEFAULT_SORT_BY,
        sortOrder: APP_CONFIG.DEFAULT_SORT_ORDER,
      };
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    updateProductInList: (state, action: PayloadAction<Product>) => {
      if (action.payload?.id) {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.data || [];
        state.pagination = action.payload?.pagination || {
          page: 1,
          limit: APP_CONFIG.DEFAULT_PAGE_SIZE,
          total: 0,
          totalPages: 0,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch products';
      });

    // Fetch Featured Products
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.data || [];
        state.pagination = action.payload?.pagination || {
          page: 1,
          limit: APP_CONFIG.DEFAULT_PAGE_SIZE,
          total: 0,
          totalPages: 0,
        };
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch featured products';
      });

    // Fetch Trending Products
    builder
      .addCase(fetchTrendingProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.data || [];
        state.pagination = action.payload?.pagination || {
          page: 1,
          limit: APP_CONFIG.DEFAULT_PAGE_SIZE,
          total: 0,
          totalPages: 0,
        };
      })
      .addCase(fetchTrendingProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch trending products';
      });

    // Fetch Product by ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload?.data || null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch product';
      });

    // Search Products
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.data || [];
        state.pagination = action.payload?.pagination || {
          page: 1,
          limit: APP_CONFIG.DEFAULT_PAGE_SIZE,
          total: 0,
          totalPages: 0,
        };
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Search failed';
      });

    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to create product';
      });

    // Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedProduct = action.payload?.data;
        if (updatedProduct) {
          const index = state.items.findIndex(item => item.id === updatedProduct.id);
          if (index !== -1) {
            state.items[index] = updatedProduct;
          }
          if (state.currentProduct?.id === updatedProduct.id) {
            state.currentProduct = updatedProduct;
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to update product';
      });

    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.items = state.items.filter(item => item.id !== action.payload);
          if (state.currentProduct?.id === action.payload) {
            state.currentProduct = null;
          }
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to delete product';
      });
  },
});

export const {
  clearError,
  setFilters,
  clearFilters,
  setCurrentProduct,
  clearCurrentProduct,
  updateProductInList,
} = productsSlice.actions;

export default productsSlice.reducer; 