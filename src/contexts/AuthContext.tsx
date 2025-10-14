// Authentication context for global state management
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '@/types/auth';
import { AuthService } from '@/services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string, user: User | null }>;
  signup: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: 'consumer' | 'provider';
  }) => Promise<{ success: boolean; message: string, user: User | null }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: { user: User; token: string } }
  | { type: 'CLEAR_USER' }
  | { type: 'UPDATE_USER'; payload: User };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
useEffect(() => {
  const initializeAuth = async () => {
    const token = localStorage.getItem('auth_token');
    const storedUser = AuthService.getStoredUser();

    if (token && storedUser) {
      // Temporarily set stored user for immediate UI load
      dispatch({ type: 'SET_USER', payload: { user: storedUser, token } });

      try {
        // Verify token with backend (to ensure it's still valid)
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          dispatch({ type: 'SET_USER', payload: { user: currentUser, token } });
        } else {
          // Invalid token — clear session
          AuthService.clearLocalAuth();
          dispatch({ type: 'CLEAR_USER' });
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        AuthService.clearLocalAuth();
        dispatch({ type: 'CLEAR_USER' });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  initializeAuth();
}, []);



  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await AuthService.login({ email, password });

      if (response.success && response.data) {
        dispatch({
          type: 'SET_USER',
          payload: {
            user: response.data.user,
            token: response.data.accessToken
          }
        });
        return { success: true, message: response.message, user: response.data.user };
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, message: response.message, user: null };
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
        user: null
      };
    }
  };

  const signup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: 'consumer' | 'provider';
  }) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await AuthService.signup(userData);

      if (response.success) {
        if (response.data?.token) {
          // User is automatically logged in
          dispatch({
            type: 'SET_USER',
            payload: {
              user: response.data.user,
              token: response.data.token
            }
          });
          return { success: true, message: response.message, user: response.data.user };
        } else {
          // Email verification required
          dispatch({ type: 'SET_LOADING', payload: false });
          return { success: true, message: response.message, user: null };
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, message: response.message, user: null };
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Signup failed',
        user: null
      };
    }
  };

  const logout = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    await AuthService.logout();
    dispatch({ type: 'CLEAR_USER' });
  };

  const refreshUser = async () => {
    const currentUser = await AuthService.getCurrentUser();
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    } else {
      dispatch({ type: 'CLEAR_USER' });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};