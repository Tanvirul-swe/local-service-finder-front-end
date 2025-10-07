import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Star, MapPin, Clock, CheckCircle, ShoppingBag, Award,
  Calendar, MessageCircle, Phone, Mail, ArrowLeft, Share2, Heart,
  BookOpen, DollarSign
} from "lucide-react";

import { Provider, ProviderResponse, Package, Portfolio, Certification, Category } from "@/types/provider";
import { ProviderService } from "@/services/providerService";
import Loader from "@/components/ui/loader";

const ServiceProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const result: ProviderResponse = await ProviderService.getProviderById(Number(id));
        if (result.success && result.data) {
          setProvider(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching provider:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [id]);

  if (loading || !provider) {
    return <Loader message="Loading provider information..." />;

  }

  // Helper for rating stars
  const renderStars = (rating: number) =>
    [...Array(Math.round(rating))].map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
    ));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to search
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "bg-primary/10 text-primary" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src="/placeholder.svg" alt={`${provider.firstName} ${provider.lastName}`} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                {provider.firstName[0] + (provider.lastName?.[0] || "")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{provider.firstName} {provider.lastName}</h1>
                {true && <CheckCircle className="h-6 w-6 text-success" />}
                {true && <ShoppingBag className="h-5 w-5 text-primary" />}
              </div>

              <p className="text-xl text-muted-foreground mb-3">{provider.category?.name || "N/A"}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-semibold">{provider.avg_rating || 0}</span>
                  <span className="text-muted-foreground">({provider.receivedReviews?.length || 0} reviews)</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.address || "Not provided"}</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(provider.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-fit">
              <Button size="lg" className="px-8">
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{provider.jobsCompleted || 0}</div>
                    <div className="text-xs text-muted-foreground">Jobs Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{provider.repeatClients || 0}%</div>
                    <div className="text-xs text-muted-foreground">Repeat Clients</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response time:</span>
                    <span className="font-medium">{provider.responseTime || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On-time rate:</span>
                    <span className="font-medium">{provider.onTimeRate || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In-progress:</span>
                    <span className="font-medium">{provider.ongoingServicesCount || "N/A"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Area */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Service Area
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Primary:</span>
                  <p className="text-muted-foreground">{provider.serviceArea?.primary || "N/A"}</p>
                </div>
                <div>
                  <span className="font-medium">Also serves:</span>
                  <p className="text-muted-foreground">{provider.serviceArea?.coverage || "N/A"}</p>
                </div>
                <div>
                  <span className="font-medium">Travel radius:</span>
                  <p className="text-muted-foreground">{provider.serviceArea?.travelRadius || "N/A"}</p>
                </div>
              </CardContent>
            </Card> */}

            {/* Availability */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Weekdays:</span>
                  <p className="text-muted-foreground">{provider.availability?.weekdays || "N/A"}</p>
                </div>
                <div>
                  <span className="font-medium">Weekends:</span>
                  <p className="text-muted-foreground">{provider.availability?.weekends || "N/A"}</p>
                </div>
                <div>
                  <span className="font-medium">Booking:</span>
                  <p className="text-muted-foreground">{provider.availability?.advance || "N/A"}</p>
                </div>
              </CardContent>
            </Card> */}

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="certifications">Credentials</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              {/* About */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {provider.firstName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{provider.about || "No bio provided."}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.category?.subCategories?.map((sub) => (
                        <Badge key={sub.id} variant="secondary">{sub.name}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Services */}
              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Pricing & Packages
                    </CardTitle>
                    <CardDescription>
                      Starting from ${provider.packages?.[0]?.price || "N/A"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {provider.packages?.map((pkg: Package, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{pkg.name}</h4>
                          <div className="text-right">
                            <div className="font-bold text-primary">${pkg.price}</div>
                            <div className="text-sm text-muted-foreground">{pkg.updatedAt || "N/A"}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews ({provider.receivedReviews?.length || 0})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {provider.receivedReviews?.map((review, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium">{review.user?.firstName} {review.user?.lastName}</div>
                            <div className="text-sm text-muted-foreground">{review.createdAt}</div>
                          </div>
                          <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">View All Reviews</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Certifications */}
              <TabsContent value="certifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Certifications & Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {provider.certifications?.map((cert: Certification, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{cert.title}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          <p className="text-sm text-muted-foreground">Earned: {cert.earnedOn}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Portfolio */}
              <TabsContent value="portfolio" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Work Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {provider.portfolios?.map((portfolio: Portfolio, index) => (
                        <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground">{portfolio.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
