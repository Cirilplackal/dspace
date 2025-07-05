import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS } from '@/constants';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: '/api', // Use Next.js API routes
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token to requests
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Try to refresh token
          const refreshToken = this.getRefreshToken();
          if (refreshToken) {
            try {
              const response = await this.instance.post('/auth/refresh', {
                refreshToken,
              });
              const { token } = response.data.data;
              this.setAuthToken(token);
              
              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.instance(originalRequest);
            } catch (refreshError) {
              // Refresh failed, clear tokens and redirect to login
              this.clearAuthTokens();
              window.location.href = '/auth/login';
              return Promise.reject(refreshError);
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic request methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.patch(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }

  // File upload method
  async upload<T = any>(url: string, formData: FormData): Promise<AxiosResponse<T>> {
    return this.instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Auth token management
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  }

  private setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  private clearAuthTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem('refresh_token');
  }
}

// Export singleton instance
const apiClient = new ApiClient();
export default apiClient; 