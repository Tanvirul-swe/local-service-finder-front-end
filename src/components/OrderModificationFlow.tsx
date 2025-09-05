import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Edit3, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  MessageSquare,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModificationRequest {
  id: string;
  bookingId: string;
  providerName: string;
  providerAvatar: string;
  originalService: string;
  originalPrice: number;
  proposedChanges: {
    newService?: string;
    newPrice?: number;
    additionalWork?: string;
    reason: string;
    estimatedTime?: string;
  };
  status: 'pending' | 'accepted' | 'declined' | 'negotiating';
  createdAt: string;
  customerResponse?: string;
  counterOffer?: number;
}

interface OrderModificationFlowProps {
  bookingId: string;
  userType: 'customer' | 'provider';
  existingModification?: ModificationRequest;
}

const OrderModificationFlow = ({ bookingId, userType, existingModification }: OrderModificationFlowProps) => {
  const { toast } = useToast();
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [modificationData, setModificationData] = useState({
    newPrice: '',
    additionalWork: '',
    reason: '',
    estimatedTime: ''
  });
  const [counterOffer, setCounterOffer] = useState('');
  const [customerResponse, setCustomerResponse] = useState('');

  const handleProviderSubmitModification = () => {
    // Simulate provider submitting modification request
    toast({
      title: "Modification Request Sent",
      description: "The customer will be notified of your proposed changes.",
    });
    setIsModifyDialogOpen(false);
    // Reset form
    setModificationData({
      newPrice: '',
      additionalWork: '',
      reason: '',
      estimatedTime: ''
    });
  };

  const handleCustomerResponse = (action: 'accept' | 'decline' | 'negotiate') => {
    const actions = {
      accept: {
        title: "Modification Accepted",
        description: "You've accepted the provider's proposed changes. The order will be updated."
      },
      decline: {
        title: "Modification Declined", 
        description: "You've declined the proposed changes. The original order remains unchanged."
      },
      negotiate: {
        title: "Counter-offer Sent",
        description: "Your counter-offer has been sent to the provider."
      }
    };

    toast(actions[action]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending Review</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Accepted</Badge>;
      case 'declined':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Declined</Badge>;
      case 'negotiating':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><MessageSquare className="w-3 h-3 mr-1" />In Negotiation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Provider View - Request Modification Button */}
      {userType === 'provider' && !existingModification && (
        <Dialog open={isModifyDialogOpen} onOpenChange={setIsModifyDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Edit3 className="w-4 h-4 mr-2" />
              Request Order Modification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Request Order Modification</DialogTitle>
              <DialogDescription>
                Propose changes to the current order. The customer will review and respond to your request.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">Important</p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Only request modifications when the actual work differs significantly from the original booking description.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPrice">Proposed New Price ($)</Label>
                  <Input
                    id="newPrice"
                    type="number"
                    placeholder="150.00"
                    value={modificationData.newPrice}
                    onChange={(e) => setModificationData(prev => ({...prev, newPrice: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedTime">Estimated Additional Time</Label>
                  <Input
                    id="estimatedTime"
                    placeholder="2 hours"
                    value={modificationData.estimatedTime}
                    onChange={(e) => setModificationData(prev => ({...prev, estimatedTime: e.target.value}))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalWork">Additional Work Required</Label>
                <Textarea
                  id="additionalWork"
                  placeholder="Describe the additional work needed..."
                  value={modificationData.additionalWork}
                  onChange={(e) => setModificationData(prev => ({...prev, additionalWork: e.target.value}))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Modification</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why the modification is necessary..."
                  value={modificationData.reason}
                  onChange={(e) => setModificationData(prev => ({...prev, reason: e.target.value}))}
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleProviderSubmitModification} className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Send Modification Request
                </Button>
                <Button variant="outline" onClick={() => setIsModifyDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modification Request Card */}
      {existingModification && (
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Edit3 className="w-5 h-5 mr-2" />
                Order Modification Request
              </CardTitle>
              {getStatusBadge(existingModification.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={existingModification.providerAvatar} alt={existingModification.providerName} />
                <AvatarFallback>{existingModification.providerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{existingModification.providerName}</p>
                <p className="text-sm text-muted-foreground">Service Provider</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Original Price</p>
                  <p className="text-lg font-semibold">${existingModification.originalPrice}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Proposed Price</p>
                  <p className="text-lg font-semibold text-primary">${existingModification.proposedChanges.newPrice}</p>
                </div>
              </div>

              {existingModification.proposedChanges.additionalWork && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Additional Work</p>
                  <p className="text-sm">{existingModification.proposedChanges.additionalWork}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Reason for Modification</p>
                <p className="text-sm">{existingModification.proposedChanges.reason}</p>
              </div>

              {existingModification.proposedChanges.estimatedTime && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Additional Time Required</p>
                  <p className="text-sm">{existingModification.proposedChanges.estimatedTime}</p>
                </div>
              )}
            </div>

            {/* Customer Response Section */}
            {userType === 'customer' && existingModification.status === 'pending' && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Your Response</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customerResponse">Message (Optional)</Label>
                    <Textarea
                      id="customerResponse"
                      placeholder="Add a message for the provider..."
                      value={customerResponse}
                      onChange={(e) => setCustomerResponse(e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => handleCustomerResponse('accept')} 
                      className="flex-1"
                      variant="default"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Changes
                    </Button>
                    <Button 
                      onClick={() => handleCustomerResponse('decline')} 
                      variant="outline" 
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="counterOffer">Or Make Counter-Offer ($)</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="counterOffer"
                        type="number"
                        placeholder="Enter your offer"
                        value={counterOffer}
                        onChange={(e) => setCounterOffer(e.target.value)}
                      />
                      <Button 
                        onClick={() => handleCustomerResponse('negotiate')}
                        variant="outline"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Send Offer
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Show responses for other statuses */}
            {existingModification.status !== 'pending' && existingModification.customerResponse && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Customer Response</p>
                  <p className="text-sm">{existingModification.customerResponse}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderModificationFlow;