import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
  Clock,
  ArrowLeft
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useSearchParams, Link } from "react-router-dom";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

interface ChatParticipant {
  id: string;
  name: string;
  avatar: string;
  role: 'customer' | 'provider';
  online: boolean;
  lastSeen?: string;
}

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

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'provider-1',
      senderName: 'Sarah Johnson',
      senderAvatar: '/placeholder.svg',
      content: 'Hi! I wanted to confirm the details for tomorrow\'s service appointment.',
      timestamp: '10:30 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: 'current-user-id',
      senderName: 'You',
      senderAvatar: '/placeholder.svg',
      content: 'Yes, I\'ll be available at 2 PM as scheduled. Do you need any specific access to the house?',
      timestamp: '10:32 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: 'provider-1',
      senderName: 'Sarah Johnson',
      senderAvatar: '/placeholder.svg',
      content: 'Perfect! I\'ll need access to the main electrical panel. It should be a straightforward repair based on your description.',
      timestamp: '10:35 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      senderId: 'current-user-id',
      senderName: 'You',
      senderAvatar: '/placeholder.svg',
      content: 'Great! The panel is in the basement. I\'ll make sure the area is clear.',
      timestamp: '10:37 AM',
      type: 'text',
      status: 'delivered'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get chat data from URL params
  const participantData = searchParams.get('participant');
  const bookingId = searchParams.get('bookingId') || 'booking-123';
  
  const participant: ChatParticipant = participantData ? JSON.parse(decodeURIComponent(participantData)) : {
    id: 'provider-1',
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg',
    role: 'provider',
    online: true
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'current-user-id',
        senderName: 'You',
        senderAvatar: '/placeholder.svg',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        status: 'sent'
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        ));
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-3 h-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/messages">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chat with {participant.name}</h1>
              <p className="text-muted-foreground">Booking #{bookingId}</p>
            </div>
          </div>
        </div>

        <Card className="h-[600px] flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {participant.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{participant.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {participant.role === 'provider' ? 'Service Provider' : 'Customer'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {participant.online ? 'Online' : `Last seen ${participant.lastSeen}`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Service Context Banner */}
          <div className="px-6 py-3 bg-muted/50 border-b">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Booking #{bookingId}</span>
              <Badge variant="outline" className="text-xs">
                Electrical Repair Service
              </Badge>
            </div>
          </div>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId === 'current-user-id';
              
              return (
                <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!isOwnMessage && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={msg.senderAvatar} alt={msg.senderName} />
                        <AvatarFallback className="text-xs">{msg.senderName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`space-y-1 ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          isOwnMessage
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      
                      <div className={`flex items-center space-x-1 text-xs text-muted-foreground ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                        <span>{msg.timestamp}</span>
                        {isOwnMessage && getMessageStatusIcon(msg.status)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="px-6 py-4 border-t">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-10"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;