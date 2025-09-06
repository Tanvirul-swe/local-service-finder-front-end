// Authentication types for external API integration

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'consumer' | 'provider';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
    refreshToken?: string;
  };
  message: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'consumer' | 'provider';
}

export interface SignupResponse {
  success: boolean;
  data?: {
    user: User;
    token?: string; // Optional if email verification is required first
  };
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}