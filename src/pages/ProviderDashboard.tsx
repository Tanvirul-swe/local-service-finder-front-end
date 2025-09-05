import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Edit3, 
  Star,
  CheckCircle,
  XCircle,
  Timer,
  CreditCard,
  MessageSquare,
  TrendingUp,
  Users,
  DollarSign,
  Settings,
  Bell,
  Award
} from "lucide-react";
import Navigation from "@/components/Navigation";
import OrderModificationFlow from "@/components/OrderModificationFlow";

// Mock data
const mockProvider = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 987-6543",
  location: "New York, NY",
  joinDate: "June 2023",
  avatar: "/placeholder.svg",
  service: "Home Cleaning",
  rating: 4.9,
  totalBookings: 156,
  completedBookings: 142,
  earnings: 12500
};

const mockIncomingBookings = [
  {
    id: 1,
    customerName: "John Doe",
    customerAvatar: "/placeholder.svg",
    serviceName: "Deep Clean Package",
    date: "2024-01-20",
    time: "10:00 AM",
    location: "123 Main St, New York, NY",
    amount: 150,
    minimumCost: 25,
    customerPhone: "+1 (555) 123-4567",
    notes: "Need deep cleaning for 3 bedroom apartment. Pet-friendly products preferred."
  },
  {
    id: 2,
    customerName: "Emily Davis",
    customerAvatar: "/placeholder.svg",
    serviceName: "Regular Cleaning",
    date: "2024-01-22",
    time: "2:00 PM",
    location: "456 Oak Ave, New York, NY",
    amount: 80,
    minimumCost: 25,
    customerPhone: "+1 (555) 456-7890",
    notes: "Weekly cleaning service for small apartment."
  }
];

const mockActiveBookings = [
  {
    id: 3,
    customerName: "Mike Wilson",
    customerAvatar: "/placeholder.svg",
    serviceName: "Move-in Cleaning",
    date: "2024-01-18",
    time: "9:00 AM",
    location: "789 Pine St, New York, NY",
    amount: 200,
    minimumCost: 25,
    status: "confirmed"
  }
];

const mockCompletedBookings = [
  {
    id: 4,
    customerName: "Lisa Brown",
    customerAvatar: "/placeholder.svg",
    serviceName: "Deep Clean Package",
    date: "2024-01-15",
    amount: 150,
    minimumCost: 25,
    rating: 5,
    review: "Excellent service! Very thorough and professional."
  }
];

const ProviderDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleAcceptBooking = (bookingId: number) => {
    console.log("Accepting booking:", bookingId);
    // Handle booking acceptance logic
  };

  const handleRejectBooking = (bookingId: number) => {
    console.log("Rejecting booking:", bookingId);
    // Handle booking rejection logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your services and bookings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">${mockProvider.earnings}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{mockProvider.totalBookings}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{mockProvider.rating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500 fill-current" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">91%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mockProvider.avatar} alt={mockProvider.name} />
                    <AvatarFallback className="text-xl">{mockProvider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{mockProvider.name}</CardTitle>
                <CardDescription>{mockProvider.service} Specialist</CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{mockProvider.rating}</span>
                  <span className="text-muted-foreground text-sm">({mockProvider.totalBookings} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{mockProvider.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{mockProvider.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{mockProvider.location}</span>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requests">
                  New Requests
                  {mockIncomingBookings.length > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 text-xs">{mockIncomingBookings.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Booking completed</p>
                          <p className="text-xs text-muted-foreground">Lisa Brown - Deep Clean Package</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">New booking request</p>
                          <p className="text-xs text-muted-foreground">John Doe - Deep Clean Package</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Payment received</p>
                          <p className="text-xs text-muted-foreground">$175 for completed service</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">This Month</span>
                        <span className="font-medium">12 bookings</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue</span>
                        <span className="font-medium">$1,850</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Rating</span>
                        <span className="font-medium">4.9 ⭐</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Response Time</span>
                        <span className="font-medium">&lt; 2 hours</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* New Requests */}
              <TabsContent value="requests" className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Timer className="w-5 h-5 mr-2" />
                      New Booking Requests
                    </CardTitle>
                    <CardDescription>
                      Review and respond to new booking requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockIncomingBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={booking.customerAvatar} alt={booking.customerName} />
                                <AvatarFallback>{booking.customerName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{booking.serviceName}</h3>
                                <p className="text-sm text-muted-foreground">by {booking.customerName}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                              <Timer className="w-3 h-3 mr-1" />New Request
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span>${booking.amount + booking.minimumCost}</span>
                            </div>
                          </div>

                          {booking.notes && (
                            <div className="bg-muted p-3 rounded-md mb-4">
                              <p className="text-sm font-medium mb-1">Customer Notes:</p>
                              <p className="text-sm text-muted-foreground">{booking.notes}</p>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-3 border-t">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{booking.customerPhone}</span>
                            </div>
                            <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    const participantData = encodeURIComponent(JSON.stringify({
                                      id: `customer-${booking.id}`,
                                      name: booking.customerName,
                                      avatar: booking.customerAvatar,
                                      role: 'customer',
                                      online: true
                                    }));
                                    window.open(`/chat?bookingId=booking-${booking.id}&participant=${participantData}`, '_blank');
                                  }}
                                >
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Message
                                </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleAcceptBooking(booking.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {mockIncomingBookings.length === 0 && (
                      <div className="text-center py-8">
                        <Timer className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No new booking requests</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Active Bookings */}
              <TabsContent value="active" className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Active Bookings
                    </CardTitle>
                    <CardDescription>
                      Your confirmed upcoming services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockActiveBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={booking.customerAvatar} alt={booking.customerName} />
                                <AvatarFallback>{booking.customerName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{booking.serviceName}</h3>
                                <p className="text-sm text-muted-foreground">by {booking.customerName}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />Confirmed
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span>${booking.amount + booking.minimumCost}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Location: {booking.location}</span>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    const participantData = encodeURIComponent(JSON.stringify({
                                      id: `customer-${booking.id}`,
                                      name: booking.customerName,
                                      avatar: booking.customerAvatar,
                                      role: 'customer',
                                      online: true
                                    }));
                                    window.open(`/chat?bookingId=booking-${booking.id}&participant=${participantData}`, '_blank');
                                  }}
                                >
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Contact
                                </Button>
                                <Button variant="outline" size="sm">
                                  Mark Complete
                                </Button>
                              </div>
                            </div>
                            
                            {/* Order Modification Flow for Provider */}
                            <OrderModificationFlow
                              bookingId={booking.id.toString()}
                              userType="provider"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {mockActiveBookings.length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No active bookings</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History */}
              <TabsContent value="history" className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Service History
                    </CardTitle>
                    <CardDescription>
                      Your completed services and customer feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockCompletedBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={booking.customerAvatar} alt={booking.customerName} />
                                <AvatarFallback>{booking.customerName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{booking.serviceName}</h3>
                                <p className="text-sm text-muted-foreground">by {booking.customerName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">{booking.date}</p>
                            </div>
                          </div>

                          {booking.review && (
                            <div className="bg-muted p-3 rounded-md mb-3">
                              <p className="text-sm font-medium mb-1">Customer Review:</p>
                              <p className="text-sm text-muted-foreground">"{booking.review}"</p>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-3 border-t">
                            <span className="text-sm font-medium">Earned: ${booking.amount + booking.minimumCost}</span>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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

export default ProviderDashboard;