import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Star, Timer, CreditCard, CheckCircle, MessageSquare, TrendingUp, Users, DollarSign, Settings, Calendar, Clock, Edit3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ProviderService } from "@/services/providerService";
import { ProviderDashboardResponse, ProviderStats, ServiceRequestDashboard } from "@/services/roviderDashboard";

const ProviderDashboard = () => {
  const { user } = useAuth(); // Get the logged-in provider
  const [selectedTab, setSelectedTab] = useState("requests");
  const [incomingBookings, setIncomingBookings] = useState<ServiceRequestDashboard[]>([]);
  const [activeBookings, setActiveBookings] = useState<ServiceRequestDashboard[]>([]);
  const [completedBookings, setCompletedBookings] = useState<ServiceRequestDashboard[]>([]);
  const [stats, setStats] = useState<ProviderStats | null>(null);

  const fetchProviderDashboard = async () => {
    if (!user) return;
    try {
      const response = await ProviderService.getProviderDashboard(user.id);
      console.log("Provider Dashboard Data:", response);

      if (response.success && response.data && response.data) {
        const allRequests = response.data.data.serviceRequests ?? [];
        const dashboardStats = response.data.data.stats ?? null;



        setIncomingBookings(allRequests.filter(req => req.status === "PENDING"));
        setActiveBookings(allRequests.filter(req => req.status === "APPROVED"));
        setCompletedBookings(allRequests.filter(req => req.status === "COMPLETED"));
        console.log("All Requests:", allRequests);
        console.log("Incoming Bookings:", incomingBookings);
        console.log("Active Bookings:", activeBookings);
        console.log("Completed Bookings:", completedBookings);
        console.log("Dashboard Stats:", dashboardStats);
        setStats(dashboardStats);
      }
    } catch (err) {
      console.error("Failed to load provider dashboard:", err);
    }
  };

  useEffect(() => {
    fetchProviderDashboard();
  }, [user]);

  const handleAcceptBooking = (bookingId: number) => {
    console.log("Accepting booking:", bookingId);
    // Here you would typically call an API to update the booking status
    ProviderService.updateServiceRequestStatus(bookingId, "APPROVED").then((res) => {
      fetchProviderDashboard();
    });
  };

  const handleRejectBooking = (bookingId: number) => {
    console.log("Rejecting booking:", bookingId);
    // Here you would typically call an API to update the booking status
    ProviderService.updateServiceRequestStatus(bookingId, "REJECTED").then((res) => {
      fetchProviderDashboard();
    });
  };

  const handleCompleteBooking = (bookingId: number) => {
    console.log("Completing booking:", bookingId);
    // Here you would typically call an API to update the booking status
    ProviderService.updateServiceRequestStatus(bookingId, "COMPLETED").then((res) => {
      fetchProviderDashboard();
    });
  }

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
                  <p className="text-2xl font-bold">${stats?.total_earning ?? 0}</p>
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
                  <p className="text-2xl font-bold">{stats?.total_booking ?? 0}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold">{stats?.avg_rating ?? 0}</p>
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
                  <p className="text-2xl font-bold">{stats?.completion_rate ?? 0}%</p>
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
                    <AvatarImage src={user?.firstName ?? "/placeholder.svg"} alt={user?.firstName ?? "Provider"} />
                    <AvatarFallback className="text-xl">{user?.firstName?.charAt(0) ?? "P"}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{user?.firstName} {user?.lastName}</CardTitle>
                <CardDescription>{user?.firstName ?? "Service Specialist"}</CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{stats?.avg_rating ?? 0}</span>
                  <span className="text-muted-foreground text-sm">({stats?.total_booking ?? 0} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.address ?? "N/A"}</span>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="requests">
                  New Requests
                  {incomingBookings.length > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 text-xs">{incomingBookings.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

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
                    {incomingBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={booking.user?.avatar ?? "/placeholder.svg"} alt={booking.user?.firstName} />
                                <AvatarFallback>{booking.user?.firstName?.charAt(0) ?? "C"}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{booking.package?.name ?? "Service Package"}</h3>
                                <p className="text-sm text-muted-foreground">by {booking.user?.firstName} {booking.user?.lastName}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                              <Timer className="w-3 h-3 mr-1" />New Request
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.preferredTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span>${booking.package?.price ?? 0}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{booking.user?.phone ?? "N/A"}</span>
                            </div>
                            <div className="flex space-x-2">
                              {/* <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const participantData = encodeURIComponent(JSON.stringify({
                                    id: `customer-${booking.id}`,
                                    name: booking.user?.firstName,
                                    avatar: booking.user?.avatar,
                                    role: 'customer',
                                    online: true
                                  }));
                                  window.open(`/chat?bookingId=booking-${booking.id}&participant=${participantData}`, '_blank');
                                }}
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button> */}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectBooking(booking.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Reject
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
                    {incomingBookings.length === 0 && (
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
                    {activeBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={booking.user?.avatar ?? "/placeholder.svg"} alt={booking.user?.firstName} />
                                <AvatarFallback>{booking.user?.firstName?.charAt(0) ?? "C"}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{booking.package?.name ?? "Service Package"}</h3>
                                <p className="text-sm text-muted-foreground">by {booking.user?.firstName} {booking.user?.lastName}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />Confirmed
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span>${booking.package?.price ?? 0}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Location: {booking.address}</span>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const participantData = encodeURIComponent(JSON.stringify({
                                      id: `customer-${booking.id}`,
                                      name: booking.user?.firstName,
                                      avatar: booking.user?.avatar,
                                      role: 'customer',
                                      online: true
                                    }));
                                    window.open(`/chat?bookingId=booking-${booking.id}&participant=${participantData}`, '_blank');
                                  }}
                                >
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Contact
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleCompleteBooking(booking.id)}>
                                  Mark Complete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {activeBookings.length === 0 && (
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
                    {completedBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={booking.user?.avatar ?? "/placeholder.svg"} alt={booking.user?.firstName} />
                                <AvatarFallback>{booking.user?.firstName?.charAt(0) ?? "C"}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{booking.package?.name ?? "Service Package"}</h3>
                                <p className="text-sm text-muted-foreground">by {booking.user?.firstName} {booking.user?.lastName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < (booking.reviews?.[0]?.rating ?? 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">{new Date(booking.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>

                          {booking.reviews?.[0]?.comment && (
                            <div className="bg-muted p-3 rounded-md mb-3">
                              <p className="text-sm font-medium mb-1">Customer Review:</p>
                              <p className="text-sm text-muted-foreground">"{booking.reviews[0].comment}"</p>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-3 border-t">
                            <span className="text-sm font-medium">Earned: ${booking.package?.price ?? 0}</span>
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
