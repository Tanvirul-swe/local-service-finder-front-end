import { Link } from "react-router-dom";
import ServiceProviderCard from "./ServiceProviderCard";
import { useEffect, useState } from "react";
import { Provider } from "@/types/provider";
import { ProviderService } from "@/services/providerService";
import Loader from "./ui/loader";

const FeaturedProviders = () => {
  const [featuredProviders, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedProviders = async () => {
      try {
        const response = await ProviderService.getTopRatedProviders();
        if (response && Array.isArray(response.data)) {

          // Map and provide defaults for missing fields
          const providersWithDefaults = response.data.map((provider: Provider) => ({
            ...provider,
            firstName: provider.firstName ?? "N/A",
            lastName: provider.lastName ?? "",
            category: provider.category ?? {
              id: 0,
              name: "N/A",
              icon: "",
              createdAt: "",
              updatedAt: "",
              subCategories: [],
            },
            avg_rating: provider.avg_rating ?? 0,
            total_rating_count: provider.total_rating_count ?? 0,
            repeatClients: provider.repeatClients ?? 0,
            jobsCompleted: provider.jobsCompleted ?? 0,
            responseTime: provider.responseTime ?? "N/A",
            onTimeRate: provider.onTimeRate ?? "N/A",
            ongoingServicesCount: provider.ongoingServicesCount ?? 0,
            packages: provider.packages ?? [],
            profileImage: provider.createdAt ?? "/placeholder.svg",
          }));

          setProviders(providersWithDefaults);
        } else {
          console.error("Invalid response for top-rated providers");
        }
      } catch (error) {
        console.error("Error fetching featured providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProviders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (featuredProviders.length === 0) {
    return <p className="text-center text-muted-foreground">No top-rated providers available.</p>;
  }

  return (
    <section id="provider" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top-Rated Service Providers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified professionals who deliver exceptional service in your area
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.map((provider) => {
            const name = `${provider.firstName} ${provider.lastName}`.trim();
            const categoryName = provider.category?.name ?? "N/A";
            const specialties = provider.category?.subCategories?.map((sc) => sc.name) ?? [];
            const price = provider.packages?.[0]?.price ?? "N/A";

            return (
              <ServiceProviderCard
                key={provider.id}
                id={provider.id?.toString()}
                name={name}
                title={categoryName}
                category={categoryName}
                rating={provider.avg_rating}
                reviewCount={provider.total_rating_count}
                location={provider.address ?? "N/A"}
                distance="N/A" // Compute if you have geolocation
                price={price}
                availability="Available" // or map from ongoingServicesCount
                verified={provider.status === "APPROVE"}
                hasStore={provider.packages?.length > 0}
                profileImage={provider.firstName}
                specialties={specialties}
                minimumCost={Number(price) || 0}
              />
            );
          })}
        </div>

        {/* View All Providers Link */}
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
