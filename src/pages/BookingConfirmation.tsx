import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, MapPin, Phone, User, Calendar, MessageCircle, Star } from "lucide-react";

const BookingConfirmation = () => {
  // Mock booking data - this would come from your booking state/API
  const bookingData = {
    id: "BK-2024-001",
    serviceType: "Electrician",
    date: "March 15, 2024",
    time: "02:00 PM",
    address: "123 Main Street, Downtown, City",
    phone: "+1 (555) 123-4567",
    urgency: "Normal",
    description: "Need to fix electrical wiring in the kitchen and install new outlets",
    status: "Confirmed",
    provider: {
      name: "John Smith",
      rating: 4.8,
      experience: "5+ years",
      phone: "+1 (555) 987-6543",
      specialties: ["Residential Wiring", "Emergency Repairs", "Smart Home Installation"]
    },
    estimatedCost: "$120 - $180",
    estimatedDuration: "2-3 hours"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-success/10 rounded-full">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your service request has been successfully booked</p>
          <Badge variant="secondary" className="mt-2">
            Booking ID: {bookingData.id}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">{bookingData.date} at {bookingData.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Service Type</p>
                      <p className="font-medium">{bookingData.serviceType}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-muted rounded-lg mt-1">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service Address</p>
                    <p className="font-medium">{bookingData.address}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Service Description</p>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg">{bookingData.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Provider Details */}
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Assigned Provider
                </CardTitle>
                <CardDescription>
                  Your service will be provided by a verified professional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {bookingData.provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg">{bookingData.provider.name}</h3>
                      <Badge variant="secondary">Verified</Badge>
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{bookingData.provider.rating}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{bookingData.provider.experience}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {bookingData.provider.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Provider
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Status Card */}
            <Card className="shadow-elegant border-border/50 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Booking Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-success text-success-foreground">
                    {bookingData.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span className="font-medium">{bookingData.estimatedCost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{bookingData.estimatedDuration}</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </div>
                    <p>Provider will contact you to confirm details</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </div>
                    <p>You'll receive live tracking when provider is en route</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </div>
                    <p>Service completion and secure payment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" variant="hero">
                Track Service Progress
              </Button>
              <Button className="w-full" variant="outline">
                View Booking Details
              </Button>
              <Button className="w-full" variant="ghost" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;