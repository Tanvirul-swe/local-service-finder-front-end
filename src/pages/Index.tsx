import Navigation from "@/components/Navigation";
import ServiceHero from "@/components/ServiceHero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedProviders from "@/components/FeaturedProviders";
import HowItWorks from "@/components/HowItWorks";
import Support from "@/components/Support";
import Footer from "@/components/Footer";

const Index = () => {
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
