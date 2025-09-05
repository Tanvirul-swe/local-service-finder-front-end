import { Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const supportOptions = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team",
    contact: "+1 (555) 123-4567",
    hours: "24/7 Available",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your questions anytime",
    contact: "support@servicehub.com",
    hours: "Response within 4 hours",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our chat bot",
    contact: "Start Chat",
    hours: "24/7 Available",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const Support = () => {
  return (
    <section id="support" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Need Help? We're Here for You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our dedicated support team is ready to help you with any questions or issues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Card key={index} className="bg-gradient-card border-border/50 text-center">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${option.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`h-8 w-8 ${option.color}`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {option.description}
                  </p>
                  <p className="text-primary font-semibold mb-2">
                    {option.contact}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{option.hours}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-card rounded-2xl p-8 border border-border/50">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-2">How do I book a service?</h4>
              <p className="text-muted-foreground mb-4">
                Simply search for the service you need, browse providers, and click "Book Now" on your preferred provider.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Are all providers verified?</h4>
              <p className="text-muted-foreground mb-4">
                Yes, all our service providers go through a comprehensive verification process including background checks.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">What if I'm not satisfied?</h4>
              <p className="text-muted-foreground mb-4">
                We offer a satisfaction guarantee. Contact our support team and we'll work to resolve any issues.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">How do payments work?</h4>
              <p className="text-muted-foreground mb-4">
                Payments are processed securely through our platform. You can pay by card or digital wallet.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline"
              onClick={() => window.open('/faq', '_blank')}
            >
              View All FAQs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;