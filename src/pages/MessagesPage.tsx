import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Plus
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

// Mock data for chat conversations
const mockConversations = [
  {
    id: '1',
    participant: {
      id: 'provider-1',
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      role: 'provider' as const,
      online: true,
      lastSeen: ''
    },
    lastMessage: 'Thanks for booking! I\'ll be there at 2 PM tomorrow.',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
    bookingId: 'booking-123',
    serviceName: 'Home Cleaning'
  },
  {
    id: '2',
    participant: {
      id: 'provider-2',
      name: 'Mike Wilson',
      avatar: '/placeholder.svg',
      role: 'provider' as const,
      online: false,
      lastSeen: '5 minutes ago'
    },
    lastMessage: 'The plumbing repair is complete. Everything should work fine now.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    bookingId: 'booking-124',
    serviceName: 'Plumbing Repair'
  },
  {
    id: '3',
    participant: {
      id: 'provider-3',
      name: 'Emily Davis',
      avatar: '/placeholder.svg',
      role: 'provider' as const,
      online: true,
      lastSeen: ''
    },
    lastMessage: 'Your pet looks adorable! The grooming session went perfectly.',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
    bookingId: 'booking-125',
    serviceName: 'Pet Grooming'
  }
];

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createChatUrl = (conversation: typeof mockConversations[0]) => {
    const participantData = encodeURIComponent(JSON.stringify(conversation.participant));
    return `/chat?bookingId=${conversation.bookingId}&participant=${participantData}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">Communicate with your service providers and customers</p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Conversations</CardTitle>
              <Button size="icon" variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  to={createChatUrl(conversation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                        <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.participant.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{conversation.participant.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {conversation.serviceName}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Booking #{conversation.bookingId}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredConversations.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No conversations found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;