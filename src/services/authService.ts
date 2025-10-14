// Authentication service for external backend integration
import { ApiService } from './api';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse, User } from '@/types/auth';

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await ApiService.post<LoginResponse>('/auth/login', credentials);
     console.log('Login Token:', response.data?.accessToken);
    if (response.success && response.data?.accessToken) {
      // Store token in localStorage
      localStorage.setItem('auth_token', response.data.accessToken);
      if (response.data.refreshToken) {
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      // Store user data
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  // Register new user
  static async signup(userData: SignupRequest): Promise<SignupResponse> {
    const response = await ApiService.post<SignupResponse>('/auth/register', userData);
    
    if (response.success && response.data?.token) {
      // Store token if provided (some apps require email verification first)
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      // Call backend logout endpoint to invalidate token
      await ApiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }
  }

  // Get current user from token
  static async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
      const response = await ApiService.get<{ success: boolean; data: User }>('/users/me');
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      // If token is invalid, clear it
      this.clearLocalAuth();
      return null;
    }
  }

  // Verify email
  static async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    return ApiService.post(`/auth/verify-email/${token}`);
  }

  // Request password reset
  static async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    return ApiService.post('/auth/forgot-password', { email });
  }

  // Reset password
  static async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    return ApiService.post(`/auth/reset-password/${token}`, { password: newPassword });
  }

  // Refresh token
  static async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;

    try {
      const response = await ApiService.post<{ success: boolean; data: { token: string } }>(
        '/auth/refresh', 
        { refreshToken }
      );
      
      if (response.success) {
        localStorage.setItem('auth_token', response.data.token);
        return response.data.token;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearLocalAuth();
    }
    
    return null;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Get stored user data
  static getStoredUser(): User | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  // Clear local authentication data
  static clearLocalAuth(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  }
}