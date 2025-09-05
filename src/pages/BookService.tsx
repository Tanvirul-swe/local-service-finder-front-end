import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, FileText, Star, CheckCircle, User, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

// Sample packages for different service categories
const servicePackages = {
  electrician: [
    { id: "basic", name: "Basic Repair", description: "Simple electrical fixes", price: 50 },
    { id: "standard", name: "Standard Service", description: "Wiring and installation", price: 100 },
    { id: "premium", name: "Premium Package", description: "Complete electrical work", price: 200 }
  ],
  cleaner: [
    { id: "basic", name: "Basic Cleaning", description: "Standard room cleaning", price: 30 },
    { id: "deep", name: "Deep Cleaning", description: "Thorough cleaning service", price: 80 },
    { id: "premium", name: "Premium Clean", description: "Complete home cleaning", price: 150 }
  ],
  tutor: [
    { id: "single", name: "Single Session", description: "One-time tutoring", price: 45 },
    { id: "weekly", name: "Weekly Package", description: "4 sessions per month", price: 160 },
    { id: "intensive", name: "Intensive Course", description: "Daily sessions for 2 weeks", price: 400 }
  ],
  default: [
    { id: "basic", name: "Basic Service", description: "Standard service package", price: 40 },
    { id: "standard", name: "Standard Package", description: "Enhanced service options", price: 80 },
    { id: "premium", name: "Premium Package", description: "Complete service solution", price: 150 }
  ]
};

const BookService = () => {
  const [date, setDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [provider, setProvider] = useState<any>(null);
  const [formData, setFormData] = useState({
    urgency: "",
    description: "",
    address: "",
    phone: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get provider data from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const providerData = urlParams.get('provider');
    if (providerData) {
      try {
        const parsedProvider = JSON.parse(decodeURIComponent(providerData));
        setProvider(parsedProvider);
      } catch (error) {
        console.error('Error parsing provider data:', error);
      }
    }
  }, [location.search]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPackagesForProvider = () => {
    if (!provider || !provider.category) return servicePackages.default;
    return servicePackages[provider.category as keyof typeof servicePackages] || servicePackages.default;
  };

  const getSelectedPackageDetails = () => {
    const packages = getPackagesForProvider();
    return packages.find(pkg => pkg.id === selectedPackage);
  };

  const getTotalCost = () => {
    const packageDetails = getSelectedPackageDetails();
    const minimumCost = provider?.minimumCost || 0;
    const packageCost = packageDetails?.price || 0;
    return minimumCost + packageCost;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock booking logic
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Service Booked Successfully!",
        description: "We'll notify you when a provider accepts your request.",
      });
      navigate("/booking-confirmation");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Book a Service</h1>
          <p className="text-muted-foreground">Tell us about your service needs and we'll connect you with the right provider</p>
        </div>

        {/* Provider Information */}
        {provider && (
          <Card className="shadow-elegant border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Service Provider
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-border">
                  <AvatarImage src={provider.profileImage} alt={provider.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {provider.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{provider.name}</h3>
                    {provider.verified && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{provider.title}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-muted-foreground">({provider.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.distance}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {provider.specialties.slice(0, 3).map((specialty: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Service Details
                </CardTitle>
                <CardDescription>
                  Provide information about the service you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="package">Service Package</Label>
                      <Select onValueChange={setSelectedPackage} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent>
                          {getPackagesForProvider().map((pkg) => (
                            <SelectItem key={pkg.id} value={pkg.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{pkg.name} - ${pkg.price}</span>
                                <span className="text-sm text-muted-foreground">{pkg.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select onValueChange={(value) => handleInputChange("urgency", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="How urgent is this?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency (ASAP)</SelectItem>
                          <SelectItem value="urgent">Urgent (Within 24 hours)</SelectItem>
                          <SelectItem value="normal">Normal (Within 3 days)</SelectItem>
                          <SelectItem value="flexible">Flexible (Within a week)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Service Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your service needs in detail..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Service Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="address"
                        type="text"
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select onValueChange={setSelectedTimeSlot}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                {slot}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  {selectedPackage && provider && (
                    <Card className="bg-gradient-subtle border-border/50 p-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-primary" />
                          <h4 className="font-semibold">Booking Cost Breakdown</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Minimum booking fee (refundable if canceled):</span>
                            <span className="font-medium">${provider.minimumCost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Package ({getSelectedPackageDetails()?.name}):</span>
                            <span className="font-medium">${getSelectedPackageDetails()?.price}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total to pay now:</span>
                            <span className="text-primary">${getTotalCost()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            The minimum booking fee will be refunded if the request is canceled before provider acceptance.
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                    variant="hero"
                    size="lg"
                  >
                    {isLoading ? "Booking Service..." : "Book Service Now"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-medium">{provider?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium">{getSelectedPackageDetails()?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{date ? format(date, "MMM dd, yyyy") : "Not selected"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{selectedTimeSlot || "Not selected"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Urgency:</span>
                  <span className="font-medium">{formData.urgency || "Not selected"}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-border/50 bg-gradient-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• We'll notify nearby providers about your request</li>
                  <li>• Providers will review and accept your booking</li>
                  <li>• You'll receive confirmation with provider details</li>
                  <li>• Track your service provider in real-time</li>
                  <li>• Pay securely after service completion</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;