import { Link } from "react-router-dom";
import ServiceProviderCard from "./ServiceProviderCard";

const featuredProviders = [
  {
    id: "1",
    name: "Mike Johnson",
    title: "Licensed Electrician",
    category: "electrician",
    rating: 4.9,
    reviewCount: 127,
    location: "Downtown",
    distance: "2.3 mi",
    price: "$75/hour",
    availability: "Available today",
    verified: true,
    hasStore: true,
    specialties: ["Wiring", "Repairs", "Installation", "Emergency Service"],
    minimumCost: 50
  },
  {
    id: "2",
    name: "Sarah Chen",
    title: "Professional Cleaner",
    category: "cleaner",
    rating: 4.8,
    reviewCount: 89,
    location: "Midtown",
    distance: "1.8 mi",
    price: "$25/hour",
    availability: "Available tomorrow",
    verified: true,
    hasStore: false,
    specialties: ["Deep Cleaning", "Office Cleaning", "Move-in/out"],
    minimumCost: 30
  },
  {
    id: "3",
    name: "Dr. James Wilson",
    title: "Math & Science Tutor",
    category: "tutor",
    rating: 5.0,
    reviewCount: 156,
    location: "University District",
    distance: "3.1 mi",
    price: "$45/hour",
    availability: "Available today",
    verified: true,
    hasStore: true,
    specialties: ["Calculus", "Physics", "Chemistry", "SAT Prep"],
    minimumCost: 40
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    title: "Beauty & Spa Specialist",
    category: "beauty-grooming",
    rating: 4.7,
    reviewCount: 203,
    location: "Fashion District",
    distance: "2.7 mi",
    price: "$60/session",
    availability: "Available today",
    verified: true,
    hasStore: true,
    specialties: ["Facials", "Massage", "Manicure", "Home Service"],
    minimumCost: 45
  },
  {
    id: "5",
    name: "David Park",
    title: "Handyman & Carpenter",
    category: "carpenter",
    rating: 4.9,
    reviewCount: 94,
    location: "Suburbs",
    distance: "4.2 mi",
    price: "$55/hour",
    availability: "Available tomorrow",
    verified: true,
    hasStore: false,
    specialties: ["Furniture Repair", "Custom Build", "Fittings"],
    minimumCost: 35
  },
  {
    id: "6",
    name: "Lisa Thompson",
    title: "Personal Trainer",
    category: "fitness-trainer",
    rating: 4.8,
    reviewCount: 78,
    location: "Health District",
    distance: "1.5 mi",
    price: "$40/session",
    availability: "Available today",
    verified: true,
    hasStore: true,
    specialties: ["Weight Loss", "Strength", "Yoga", "Nutrition"],
    minimumCost: 30
  }
];

const FeaturedProviders = () => {
  return (
    <section id="provider" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top-Rated Service Providers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified professionals who deliver exceptional service in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.map((provider, index) => (
            <ServiceProviderCard key={index} {...provider} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/providers" 
            className="text-primary font-semibold hover:text-primary-dark transition-smooth"
          >
            View All Providers →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;