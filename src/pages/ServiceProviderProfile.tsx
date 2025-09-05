import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ShoppingBag, 
  Award,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
  Share2,
  Heart,
  BookOpen,
  DollarSign,
  Users,
  TrendingUp
} from "lucide-react";

const ServiceProviderProfile = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock data for the service provider
  const provider = {
    id: 1,
    name: "Sarah Johnson",
    title: "Professional House Cleaner & Organizer",
    rating: 4.8,
    reviewCount: 127,
    location: "Downtown, New York",
    joinDate: "March 2022",
    verified: true,
    hasStore: true,
    profileImage: "/placeholder.svg",
    bio: "With over 8 years of experience in professional cleaning services, I take pride in delivering exceptional results for every client. I specialize in deep cleaning, organization, and eco-friendly cleaning solutions. My attention to detail and commitment to customer satisfaction has earned me a 5-star rating from over 100 satisfied clients.",
    specialties: [
      "Deep Cleaning",
      "Move-in/Move-out Cleaning", 
      "Eco-friendly Products",
      "Organization",
      "Post-construction Cleanup",
      "Office Cleaning"
    ],
    certifications: [
      {
        name: "Certified Professional Cleaner",
        issuer: "National Cleaning Association",
        date: "2023"
      },
      {
        name: "Eco-friendly Cleaning Specialist",
        issuer: "Green Clean Institute", 
        date: "2022"
      },
      {
        name: "OSHA Safety Certification",
        issuer: "Occupational Safety & Health Administration",
        date: "2023"
      }
    ],
    pricing: {
      hourlyRate: "$35-45/hour",
      packages: [
        {
          name: "Standard Clean",
          price: "$80-120",
          duration: "2-3 hours",
          description: "Regular maintenance cleaning for homes up to 2000 sq ft"
        },
        {
          name: "Deep Clean",
          price: "$150-250", 
          duration: "4-6 hours",
          description: "Comprehensive cleaning including baseboards, inside appliances, and detailed work"
        },
        {
          name: "Move-in/out Clean",
          price: "$200-300",
          duration: "5-8 hours", 
          description: "Complete cleaning for moving situations, including inside cabinets and fixtures"
        }
      ]
    },
    serviceArea: {
      primary: "Manhattan, NYC",
      coverage: "Brooklyn, Queens, Bronx",
      travelRadius: "25 miles"
    },
    availability: {
      weekdays: "8:00 AM - 6:00 PM",
      weekends: "9:00 AM - 4:00 PM",
      advance: "24-48 hours notice preferred"
    },
    stats: {
      completedJobs: 234,
      repeatClients: 89,
      responseTime: "2 hours",
      onTimeRate: "98%"
    },
    reviews: [
      {
        id: 1,
        name: "Emily Chen",
        rating: 5,
        date: "2 days ago",
        comment: "Sarah did an amazing job cleaning my apartment. Very thorough and professional. Highly recommend!",
        service: "Standard Clean"
      },
      {
        id: 2,
        name: "Michael Rodriguez", 
        rating: 5,
        date: "1 week ago",
        comment: "Exceptional service! Sarah transformed my office space. Will definitely book again.",
        service: "Office Cleaning"
      },
      {
        id: 3,
        name: "Jennifer Liu",
        rating: 4,
        date: "2 weeks ago", 
        comment: "Great attention to detail. The deep clean was exactly what I needed before moving in.",
        service: "Deep Clean"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
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
              <AvatarImage src={provider.profileImage} alt={provider.name} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                {provider.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{provider.name}</h1>
                {provider.verified && (
                  <CheckCircle className="h-6 w-6 text-success" />
                )}
                {provider.hasStore && (
                  <ShoppingBag className="h-5 w-5 text-primary" />
                )}
              </div>
              
              <p className="text-xl text-muted-foreground mb-3">{provider.title}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-semibold">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.location}</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {provider.joinDate}</span>
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
          {/* Left Column - Stats & Quick Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{provider.stats.completedJobs}</div>
                    <div className="text-xs text-muted-foreground">Jobs Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{provider.stats.repeatClients}%</div>
                    <div className="text-xs text-muted-foreground">Repeat Clients</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response time:</span>
                    <span className="font-medium">{provider.stats.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On-time rate:</span>
                    <span className="font-medium">{provider.stats.onTimeRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Area */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Service Area
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Primary:</span>
                  <p className="text-muted-foreground">{provider.serviceArea.primary}</p>
                </div>
                <div>
                  <span className="font-medium">Also serves:</span>
                  <p className="text-muted-foreground">{provider.serviceArea.coverage}</p>
                </div>
                <div>
                  <span className="font-medium">Travel radius:</span>
                  <p className="text-muted-foreground">{provider.serviceArea.travelRadius}</p>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Weekdays:</span>
                  <p className="text-muted-foreground">{provider.availability.weekdays}</p>
                </div>
                <div>
                  <span className="font-medium">Weekends:</span>
                  <p className="text-muted-foreground">{provider.availability.weekends}</p>
                </div>
                <div>
                  <span className="font-medium">Booking:</span>
                  <p className="text-muted-foreground">{provider.availability.advance}</p>
                </div>
              </CardContent>
            </Card>

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

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="certifications">Credentials</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Sarah</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{provider.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Pricing & Packages
                    </CardTitle>
                    <CardDescription>
                      Starting from {provider.pricing.hourlyRate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {provider.pricing.packages.map((pkg, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{pkg.name}</h4>
                          <div className="text-right">
                            <div className="font-bold text-primary">{pkg.price}</div>
                            <div className="text-sm text-muted-foreground">{pkg.duration}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews ({provider.reviewCount})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {provider.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-muted-foreground">{review.date} • {review.service}</div>
                          </div>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      View All Reviews
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Certifications & Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {provider.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          <p className="text-sm text-muted-foreground">Earned: {cert.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Work Portfolio
                    </CardTitle>
                    <CardDescription>
                      See examples of Sarah's work
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1,2,3,4,5,6].map((item) => (
                        <div key={item} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground">Before/After {item}</span>
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