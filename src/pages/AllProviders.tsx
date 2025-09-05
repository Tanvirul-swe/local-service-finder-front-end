import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, MapPin, Star } from "lucide-react";
import ServiceProviderCard from "@/components/ServiceProviderCard";

const allProviders = [
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
  },
  {
    id: "7",
    name: "Robert Martinez",
    title: "Licensed Plumber",
    category: "plumber",
    rating: 4.6,
    reviewCount: 142,
    location: "Central",
    distance: "2.8 mi",
    price: "$80/hour",
    availability: "Available today",
    verified: true,
    hasStore: false,
    specialties: ["Pipe Repair", "Installation", "Emergency", "Maintenance"],
    minimumCost: 60
  },
  {
    id: "8",
    name: "Emily Davis",
    title: "Certified Babysitter",
    category: "babysitter",
    rating: 4.9,
    reviewCount: 67,
    location: "Residential",
    distance: "1.2 mi",
    price: "$20/hour",
    availability: "Available tomorrow",
    verified: true,
    hasStore: false,
    specialties: ["Infant Care", "Toddler Care", "Homework Help", "Activities"],
    minimumCost: 25
  }
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
  { value: "carpenter", label: "Carpenter" },
  { value: "cleaner", label: "House Cleaner" },
  { value: "tutor", label: "Tutor" },
  { value: "fitness-trainer", label: "Fitness Trainer" },
  { value: "beauty-grooming", label: "Beauty & Grooming" },
  { value: "babysitter", label: "Babysitter" }
];

const AllProviders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filteredProviders = allProviders
    .filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.specialties.some(specialty => 
                            specialty.toLowerCase().includes(searchTerm.toLowerCase())
                          );
      const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
      const matchesRating = selectedRating === "all" || 
                           (selectedRating === "4+" && provider.rating >= 4.0) ||
                           (selectedRating === "4.5+" && provider.rating >= 4.5) ||
                           (selectedRating === "4.8+" && provider.rating >= 4.8);
      const matchesAvailability = selectedAvailability === "all" ||
                                 (selectedAvailability === "today" && provider.availability.includes("today")) ||
                                 (selectedAvailability === "tomorrow" && provider.availability.includes("tomorrow"));

      return matchesSearch && matchesCategory && matchesRating && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""));
        case "price-high":
          return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""));
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">All Service Providers</h1>
          <p className="text-muted-foreground">Browse and filter through our network of verified professionals</p>
        </div>

        {/* Filters Section */}
        <Card className="shadow-elegant border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-primary" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search providers, services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4+">4.0+ Stars</SelectItem>
                  <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                  <SelectItem value="4.8+">4.8+ Stars</SelectItem>
                </SelectContent>
              </Select>

              {/* Availability Filter */}
              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="today">Available Today</SelectItem>
                  <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                Showing {filteredProviders.length} of {allProviders.length} providers
              </p>
              {(searchTerm || selectedCategory !== "all" || selectedRating !== "all" || selectedAvailability !== "all") && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedRating("all");
                    setSelectedAvailability("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ServiceProviderCard 
                key={provider.id} 
                {...provider} 
              />
            ))}
          </div>
        ) : (
          <Card className="shadow-elegant border-border/50 text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No providers found</p>
                <p>Try adjusting your filters or search terms</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedRating("all");
                  setSelectedAvailability("all");
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AllProviders;