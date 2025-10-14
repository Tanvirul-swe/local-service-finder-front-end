import Navigation from "@/components/Navigation";
import ServiceHero from "@/components/ServiceHero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedProviders from "@/components/FeaturedProviders";
import HowItWorks from "@/components/HowItWorks";
import Support from "@/components/Support";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.role === "PROVIDER") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <ServiceHero />
        <ServiceCategories />
        <FeaturedProviders />
        <HowItWorks />
        <Support />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
