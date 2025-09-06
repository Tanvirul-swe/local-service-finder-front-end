// Custom hook for handling authentication redirects
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface UseAuthRedirectOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  userTypeRedirect?: {
    consumer: string;
    provider: string;
  };
}

export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const { 
    redirectTo = '/', 
    requireAuth = false,
    userTypeRedirect 
  } = options;
  
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    // If authentication is required and user is not authenticated
    if (requireAuth && !isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    // If user is authenticated and we have type-specific redirects
    if (isAuthenticated && user && userTypeRedirect) {
      const targetRoute = userTypeRedirect[user.userType];
      navigate(targetRoute, { replace: true });
      return;
    }

    // General redirect for authenticated users
    if (isAuthenticated && redirectTo !== window.location.pathname) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, user, isLoading, navigate, redirectTo, requireAuth, userTypeRedirect]);

  return { isAuthenticated, user, isLoading };
};