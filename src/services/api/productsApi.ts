import { ApiResponse, Product, SearchParams, PaginatedResponse } from '@/types';
import { API_ENDPOINTS } from '@/constants';
import apiClient from './client';

export interface ProductsResponse extends PaginatedResponse<Product> {}
export interface ProductResponse extends ApiResponse<Product> {}

class ProductsApi {
  /**
   * Get all products with pagination and filters
   */
  async getProducts(params: SearchParams = {}): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = `${API_ENDPOINTS.PRODUCTS.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<ProductsResponse>(url);
    return response.data;
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<ProductResponse> {
    const response = await apiClient.get<ProductResponse>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  }

  /**
   * Create new product
   */
  async createProduct(productData: Partial<Product>): Promise<ProductResponse> {
    const response = await apiClient.post<ProductResponse>(API_ENDPOINTS.PRODUCTS.CREATE, productData);
    return response.data;
  }

  /**
   * Update product
   */
  async updateProduct(id: string, productData: Partial<Product>): Promise<ProductResponse> {
    const response = await apiClient.put<ProductResponse>(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData);
    return response.data;
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(API_ENDPOINTS.PRODUCTS.DELETE(id));
    return response.data;
  }

  /**
   * Search products
   */
  async searchProducts(params: SearchParams): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = `${API_ENDPOINTS.PRODUCTS.SEARCH}?${queryParams.toString()}`;
    const response = await apiClient.get<ProductsResponse>(url);
    return response.data;
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string, params: SearchParams = {}): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('category', category);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = `${API_ENDPOINTS.PRODUCTS.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<ProductsResponse>(url);
    return response.data;
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 10): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.LIST}?featured=true&limit=${limit}`
    );
    return response.data;
  }

  /**
   * Get trending products
   */
  async getTrendingProducts(limit: number = 10): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.LIST}?trending=true&limit=${limit}`
    );
    return response.data;
  }

  /**
   * Get related products
   */
  async getRelatedProducts(productId: string, limit: number = 5): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/related?limit=${limit}`
    );
    return response.data;
  }

  /**
   * Upload product images
   */
  async uploadProductImages(productId: string, files: File[]): Promise<ApiResponse<{ images: string[] }>> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    const response = await apiClient.upload<ApiResponse<{ images: string[] }>>(
      `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/images`,
      formData
    );
    return response.data;
  }

  /**
   * Delete product image
   */
  async deleteProductImage(productId: string, imageUrl: string): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/images`,
      { data: { imageUrl } }
    );
    return response.data;
  }

  /**
   * Update product stock
   */
  async updateProductStock(productId: string, stock: number): Promise<ProductResponse> {
    const response = await apiClient.patch<ProductResponse>(
      `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/stock`,
      { stock }
    );
    return response.data;
  }

  /**
   * Get product reviews
   */
  async getProductReviews(productId: string, params: { page?: number; limit?: number } = {}): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const url = `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/reviews?${queryParams.toString()}`;
    const response = await apiClient.get<ApiResponse<any[]>>(url);
    return response.data;
  }

  /**
   * Add product review
   */
  async addProductReview(productId: string, review: {
    rating: number;
    comment: string;
  }): Promise<ApiResponse<any>> {
    const response = await apiClient.post<ApiResponse<any>>(
      `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/reviews`,
      review
    );
    return response.data;
  }

  /**
   * Get product statistics
   */
  async getProductStats(productId: string): Promise<ApiResponse<{
    totalSales: number;
    totalRevenue: number;
    averageRating: number;
    reviewCount: number;
  }>> {
    const response = await apiClient.get<ApiResponse<any>>(
      `${API_ENDPOINTS.PRODUCTS.DETAIL(productId)}/stats`
    );
    return response.data;
  }

  /**
   * Bulk update products
   */
  async bulkUpdateProducts(updates: Array<{ id: string; data: Partial<Product> }>): Promise<ApiResponse<Product[]>> {
    const response = await apiClient.patch<ApiResponse<Product[]>>(
      `${API_ENDPOINTS.PRODUCTS.LIST}/bulk`,
      { updates }
    );
    return response.data;
  }

  /**
   * Bulk delete products
   */
  async bulkDeleteProducts(productIds: string[]): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${API_ENDPOINTS.PRODUCTS.LIST}/bulk`,
      { data: { productIds } }
    );
    return response.data;
  }
}

export const productsApi = new ProductsApi();
export default productsApi; 