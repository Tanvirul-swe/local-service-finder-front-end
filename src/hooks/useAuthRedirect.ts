// Custom hook for handling authentication redirects
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface UseAuthRedirectOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  userTypeRedirect?: {
    CUSTOMER?: string;
    PROVIDER?: string;
    ADMIN?: string;
  };
}

export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const {
    redirectTo = "/login",
    requireAuth = false,
    userTypeRedirect,
  } = options;

  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    // 🔒 Require login for protected routes
    if (requireAuth && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    // 🚀 Auto-redirect logged-in users (e.g., from /login or /signup)
    if (isAuthenticated && user) {
      // Role-based redirect
      if (userTypeRedirect && user.role && userTypeRedirect[user.role]) {
        const targetRoute = userTypeRedirect[user.role];
        if (targetRoute && targetRoute !== window.location.pathname) {
          navigate(targetRoute, { replace: true });
        }
        return;
      }

      // General redirect fallback
      if (
        redirectTo &&
        redirectTo !== window.location.pathname &&
        !userTypeRedirect
      ) {
        navigate(redirectTo, { replace: true });
      }
    }
  }, [
    isAuthenticated,
    user,
    isLoading,
    navigate,
    redirectTo,
    requireAuth,
    userTypeRedirect,
  ]);

  return { isAuthenticated, user, isLoading };
};
