import { Star, MapPin, Clock, CheckCircle, ShoppingBag, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ServiceProviderCardProps {
  id?: string;
  name: string;
  title: string;
  category?: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  price: string;
  availability: string;
  verified: boolean;
  hasStore: boolean;
  profileImage?: string;
  specialties: string[];
  minimumCost?: number;
}

const ServiceProviderCard = ({
  id,
  name,
  title,
  category,
  rating,
  reviewCount,
  location,
  distance,
  price,
  availability,
  verified,
  hasStore,
  profileImage,
  specialties,
  minimumCost
}: ServiceProviderCardProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); // ✅ Call hook at top level

  const handleBookNow = () => {
    const providerData = {
      id,
      name,
      title,
      category,
      rating,
      reviewCount,
      location,
      distance,
      price,
      availability,
      verified,
      hasStore,
      profileImage,
      specialties,
      minimumCost
    };

    // Navigate to /book-service and pass provider data via state
    // Check user authentication status before navigating

    console.log("Booking attempt by user:", { isAuthenticated, user });

    if (isAuthenticated) {
      navigate("/book-service", {
        state: { provider: providerData }
      });
    } else {
      navigate("/login");
    }
  };

  const handleMessageProvider = () => {
    const participantData = encodeURIComponent(JSON.stringify({
      id: id || `provider-${name.replace(/\s+/g, '-').toLowerCase()}`,
      name,
      avatar: profileImage || '/placeholder.svg',
      role: 'provider',
      online: true
    }));
    window.open(`/chat?bookingId=new-inquiry&participant=${participantData}`, '_blank');
  };
  return (
    <Card className="bg-gradient-card hover:shadow-service-card transition-smooth cursor-pointer border-border/50 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarImage src={profileImage} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                {name}
              </h3>
              {verified && (
                <CheckCircle className="h-5 w-5 text-success" />
              )}
              {hasStore && (
                <ShoppingBag className="h-4 w-4 text-primary" />
              )}
            </div>

            <p className="text-muted-foreground mb-2">{title}</p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground">({reviewCount})</span>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{distance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{specialties.length - 3} more
            </Badge>
          )}
        </div>

        {/* Pricing and Availability */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div>
            <span className="text-muted-foreground">Starting from </span>
            <span className="font-semibold text-foreground">{price}</span>
          </div>

          <div className="flex items-center gap-1 text-success">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{availability}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="default" className="flex-1" onClick={handleBookNow}>
            Book Now
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(`/service-provider-profile/${id}`, '_blank')}
          >
            View Profile
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMessageProvider}
            title="Message Provider"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceProviderCard;