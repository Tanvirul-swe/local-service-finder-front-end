import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import {
  Wrench,
  GraduationCap,
  Truck,
  Briefcase,
  Car,
  Stethoscope,
  Loader
} from "lucide-react";
import { Category } from "@/services/category";
import { ProviderService } from "@/services/providerService";

// Optional: local fallback icons (to match existing look)
const defaultIcons: Record<string, any> = {
  "Home Services": Wrench,
  "Personal Care": GraduationCap,
  "Delivery & Logistics": Truck,
  "Professional Services": Briefcase,
  "Automobile": Car,
  "Healthcare": Stethoscope,
};

const ServiceCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ProviderService.getAllCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
          {categories.map((category) => {
            const IconComponent = defaultIcons[category.name] || Wrench; // fallback icon
            const subNames = category.subCategories?.map((sub) => sub.name).join(", ");

            return (
              <Card
                key={category.id}
                className="bg-gradient-card hover:shadow-service-card transition-smooth cursor-pointer border-border/50 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-muted group-hover:scale-110 transition-bounce">
                      {category.icon ? (
                        <img
                          src={category.icon}
                          alt={category.name}
                          className="h-6 w-6 invert-[50%] sepia-[100%] saturate-[500%] hue-rotate-[180deg]"

                        />
                      ) : (
                        <IconComponent className="h-6 w-6 text-primary" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2 truncate">
                        {subNames || "Various services available"}
                      </p>
                      <p className="text-primary font-medium text-sm">
                        600+ providers
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
