import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format, parseISO } from "date-fns";

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
  MessageSquare
} from "lucide-react";
import Navigation from "@/components/Navigation";
import OrderModificationFlow from "@/components/OrderModificationFlow";
import { useAuth } from "@/contexts/AuthContext";
import { ProviderService } from "@/services/providerService";
import { ServiceRequest } from "@/types/provider";



const UserProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.firstName || "John Doe",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@email.com",
    phone: user?.phone || "+1 (555) 123-4567",
    location: user?.address || "New York, NY",
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "January 2024",
    avatar: user?.email || "/placeholder.svg"
    
  });

  const [bookings, setBookings] = useState<ServiceRequest[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Timer className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'APPROVED':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'REJECTED':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Optional: Fetch provider data or other user-related info from API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const response = await ProviderService.getProviderById(user.id);
        console.log("Provider API response:", response.data.serviceRequestsAsCustomer);
        if (response.success && response.data) {
          const u = response.data;
          setUserInfo({
            name: `${u.firstName} ${u.lastName || ""}`.trim(),
            lastName: u.lastName || "Doe",
            email: u.email,
            phone: u.phone || "+1 (555) 123-4567",
            location: u.address || "New York, NY",
            joinDate: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "January 2024",
            avatar: u.email || "/placeholder.svg"
          });
          setBookings(u.serviceRequestsAsCustomer || []);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and booking history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                    <AvatarFallback className="text-xl">{userInfo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{userInfo.name}</CardTitle>
                <CardDescription>Member since {userInfo.joinDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{userInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{userInfo.location}</span>
                </div>
                <Separator />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-elegant mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-medium">{bookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium">{bookings.filter(b => b.status === 'APPROVED').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium">{bookings.filter(b => b.status === 'PENDING').length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">Current Bookings</TabsTrigger>
                <TabsTrigger value="history">Booking History</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>

              {/* Current Bookings */}
              <TabsContent value="bookings" className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Current Bookings
                    </CardTitle>
                    <CardDescription>
                      Your active and pending service requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {bookings.filter(b => b.status !== 'COMPLETED').map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={booking.serviceProvider.firstName} alt={booking.serviceProvider.firstName} />
                                <AvatarFallback>{booking.serviceProvider.firstName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{booking.package.name}</h3>
                                <p className="text-sm text-muted-foreground">by {booking.serviceProvider.firstName}</p>
                              </div>
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.preferredDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{format(parseISO(`1970-01-01T${booking.preferredTime}`), "hh:mm a")}</span>                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span>${booking.package.price}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Booking History */}
              <TabsContent value="history" className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Booking History
                    </CardTitle>
                    <CardDescription>
                      Your completed and cancelled bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {bookings.filter(booking => booking.status === 'COMPLETED' || booking.status === 'REJECTED' || booking.status === 'APPROVED').map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={booking.serviceProvider.firstName} alt={booking.serviceProvider.firstName} />
                                <AvatarFallback>{booking.serviceProvider.firstName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{booking.serviceProvider.firstName}</h3>
                                <p className="text-sm text-muted-foreground">by {booking.serviceProvider.firstName}</p>
                              </div>
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.preferredDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span>${booking.package.price}</span>
                            </div>
                          </div>

                          {booking.serviceProvider.id && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">Your Rating:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < 4.5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Settings */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          defaultValue={userInfo.name.split(' ')[0]}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          defaultValue={userInfo.name.split(' ')[1]}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={userInfo.email}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        defaultValue={userInfo.phone}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        defaultValue={userInfo.location}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us a bit about yourself..."
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-3">
                        <Button className="flex-1">Save Changes</Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
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

export default UserProfile;
