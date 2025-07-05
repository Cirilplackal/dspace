import { ApiResponse, User, LoginForm, RegisterForm } from '@/types';
import { API_ENDPOINTS } from '@/constants';
import apiClient from './client';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginResponse extends ApiResponse<AuthResponse> {}
export interface RegisterResponse extends ApiResponse<AuthResponse> {}
export interface ProfileResponse extends ApiResponse<User> {}

class AuthApi {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginForm): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  }

  /**
   * Register new user
   */
  async register(userData: RegisterForm): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string }>> {
    const response = await apiClient.post<ApiResponse<{ token: string }>>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return response.data;
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ProfileResponse> {
    const response = await apiClient.get<ProfileResponse>(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(userData: Partial<User>): Promise<ProfileResponse> {
    const response = await apiClient.put<ProfileResponse>(API_ENDPOINTS.AUTH.PROFILE, userData);
    return response.data;
  }

  /**
   * Change password
   */
  async changePassword(passwords: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>('/auth/change-password', passwords);
    return response.data;
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>('/auth/forgot-password', { email });
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: {
    token: string;
    newPassword: string;
  }): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>('/auth/reset-password', data);
    return response.data;
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>('/auth/verify-email', { token });
    return response.data;
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>('/auth/resend-verification', { email });
    return response.data;
  }

  /**
   * Upload profile avatar
   */
  async uploadAvatar(file: File): Promise<ApiResponse<{ avatar: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await apiClient.upload<ApiResponse<{ avatar: string }>>(
      '/auth/upload-avatar',
      formData
    );
    return response.data;
  }

  /**
   * Delete profile avatar
   */
  async deleteAvatar(): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>('/auth/avatar');
    return response.data;
  }
}

export const authApi = new AuthApi();
export default authApi; 