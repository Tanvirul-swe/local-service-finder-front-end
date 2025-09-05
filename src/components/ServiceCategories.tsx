import { 
  Wrench, 
  Home, 
  GraduationCap, 
  Truck, 
  Camera, 
  Car,
  Heart,
  Scissors,
  Stethoscope,
  Shield,
  Package,
  Briefcase
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    icon: Wrench,
    title: "Home Services",
    description: "Electrician, Plumber, Carpenter, Cleaner",
    count: "1,200+ providers",
    color: "text-blue-600"
  },
  {
    icon: GraduationCap,
    title: "Personal Services",
    description: "Tutors, Trainers, Beauty & Grooming",
    count: "800+ providers",
    color: "text-green-600"
  },
  {
    icon: Truck,
    title: "Delivery & Logistics",
    description: "Medicine, Gas, Grocery, Courier",
    count: "500+ providers",
    color: "text-orange-600"
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Real Estate, Photography, IT Support",
    count: "600+ providers",
    color: "text-purple-600"
  },
  {
    icon: Car,
    title: "Automobile",
    description: "Car Wash, Mechanic, Bike Repair",
    count: "300+ providers",
    color: "text-red-600"
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Elderly Care, Nursing, Medical",
    count: "400+ providers",
    color: "text-teal-600"
  }
];

const ServiceCategories = () => {
  return (
    <section id="services" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect service provider for your needs across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index} 
                className="bg-gradient-card hover:shadow-service-card transition-smooth cursor-pointer border-border/50 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-muted group-hover:scale-110 transition-bounce`}>
                      <IconComponent className={`h-6 w-6 ${category.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {category.description}
                      </p>
                      <p className="text-primary font-medium text-sm">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;