// Authentication types for external API integration

export interface User {
  id: number;
  firstName: string;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN'; // maps to backend role
  about?: string | null;
  signUpType: 'EMAIL' | 'GOOGLE' | 'FACEBOOK';
  status: 'APPROVE' | 'PENDING' | 'BLOCKED';
  activeStatus: boolean;
  isEmailVerified: boolean; // you can map this from status or a separate field
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
    accessToken: string;
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