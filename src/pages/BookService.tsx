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
import { ProviderService } from "@/services/providerService";
import { ApiService } from "@/services/api";
import { BookingRequest } from "@/types/booking";
import { useAuth } from "@/contexts/AuthContext";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

const BookService = () => {
  const [date, setDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [provider, setProvider] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);
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

  // Load provider data from state and fetch packages
  useEffect(() => {
    const providerData = location.state?.provider;
    if (providerData) {
      setProvider(providerData);
      fetchProviderPackages(providerData.id);
    } else {
      toast({
        title: "Error",
        description: "Provider data not found",
        variant: "destructive",
      });
    }
  }, [location.state]);

  const fetchProviderPackages = async (userId: number) => {
    try {
      const response = await ProviderService.getPackagesByUserId(userId);
      if (response.success) {
        setPackages(response.data);
      } else {
        toast({
          title: "Failed to fetch packages",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while fetching packages",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getSelectedPackageDetails = () => {
    return packages.find(pkg => pkg.id.toString() === selectedPackage);
  };

  const getTotalCost = () => {
    const packageDetails = getSelectedPackageDetails();
    const minimumCost = provider?.minimumCost || 0;
    const packageCost = packageDetails?.price || 0;
    return minimumCost + Number(packageCost);
  };

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
  };

  const handleBooking = async (e: React.FormEvent) => {
   
    e.preventDefault();

    if (!selectedPackage || !date || !selectedTimeSlot) {
      toast({
        title: "Incomplete details",
        description: "Please select package, date, and time",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const urgencyMap: Record<string, number> = {
        emergency: 1,
        urgent: 2,
        normal: 3,
        flexible: 4,
      };

      const payload: BookingRequest = {
        userId: 4,
        serviceProviderId: Number(provider.id),
        packageId: Number(selectedPackage),
        urgentLevel: urgencyMap[formData.urgency] || 3,
        description: formData.description,
        address: formData.address,
        contactNumber: formData.phone,
        preferredDate: format(date, "yyyy-MM-dd"),
        preferredTime: selectedTimeSlot.includes("AM") || selectedTimeSlot.includes("PM")
          ? convertTo24Hour(selectedTimeSlot)
          : selectedTimeSlot,
      };

      const response = await ProviderService.createServiceRequest(payload);

      if (response.success) {
        toast({
          title: "Booking Successful",
          description: "Your service booking has been submitted.",
        });
        navigate("/booking-confirmation");
      } else {
        toast({
          title: "Booking Failed",
          description: response.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading guard
  if (!provider) {
    return <div className="min-h-screen flex items-center justify-center">Loading provider data...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Book a Service</h1>
          <p className="text-muted-foreground">Tell us about your service needs and we'll connect you with the right provider</p>
        </div>

        {/* Provider Info */}
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
                <AvatarImage src={provider.name} alt={provider.name} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {provider.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">{provider.name}</h3>
                  {provider.verified && <CheckCircle className="h-5 w-5 text-success" />}
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
                    <Badge key={index} variant="secondary" className="text-xs">{specialty}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Service Details
                </CardTitle>
                <CardDescription>Provide information about the service you need</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-6">

                  {/* Package Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="package">Service Package</Label>
                    <Select onValueChange={setSelectedPackage} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map(pkg => (
                          <SelectItem key={pkg.id} value={pkg.id.toString()}>
                            <div className="flex flex-col">
                              <span className="font-medium">{pkg.name} - ${pkg.price}</span>
                              <span className="text-sm text-muted-foreground">{pkg.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select onValueChange={v => handleInputChange("urgency", v)} required>
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

                  {/* Description */}
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

                  {/* Address */}
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

                  {/* Phone */}
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

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
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
                          {timeSlots.map(slot => (
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

                  {/* Pricing */}
                  {selectedPackage && (
                    <Card className="bg-gradient-subtle border-border/50 p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Minimum booking fee:</span>
                          <span className="font-medium">${provider.minimumCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Package ({getSelectedPackageDetails()?.name}):</span>
                          <span className="font-medium">${getSelectedPackageDetails()?.price}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span className="text-primary">${getTotalCost()}</span>
                        </div>
                      </div>
                    </Card>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !selectedPackage || !date || !selectedTimeSlot}
                    variant="hero"
                    size="lg"
                  >
                    {isLoading ? "Booking Service..." : "Book Service Now"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-medium">{provider.name}</span>
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

            {/* What happens next */}
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
