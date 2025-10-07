import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import BookService from "./pages/BookService";
import BookingConfirmation from "./pages/BookingConfirmation";
import ServiceProviderProfile from "./pages/ServiceProviderProfile";
import FAQ from "./pages/FAQ";
import AllProviders from "./pages/AllProviders";
import UserProfile from "./pages/UserProfile";
import ProviderDashboard from "./pages/ProviderDashboard";
import ChatPage from "./pages/ChatPage";
import MessagesPage from "./pages/MessagesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="servicehub-ui-theme">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/book-service" element={<BookService />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/service-provider-profile/:id" element={<ServiceProviderProfile />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/providers" element={<AllProviders />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/dashboard" element={<ProviderDashboard />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
