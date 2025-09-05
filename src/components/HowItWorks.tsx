import { Search, UserCheck, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    description: "Find the perfect service provider using our advanced search filters. Browse by location, ratings, availability, and more.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: UserCheck,
    title: "Review & Select",
    description: "Check provider profiles, read verified reviews, view portfolios, and compare pricing to make the best choice.",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Calendar,
    title: "Book & Track",
    description: "Schedule your service instantly or for later. Track your provider's location in real-time and get status updates.",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: Star,
    title: "Rate & Review",
    description: "After service completion, rate your experience and help other users by sharing your honest feedback.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How ServiceHub Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting the help you need is simple with our streamlined platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="bg-gradient-card border-border/50 text-center relative">
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${step.bgColor} flex items-center justify-center mt-2`}>
                    <IconComponent className={`h-8 w-8 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Join thousands of satisfied customers who found their perfect service provider on ServiceHub
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-smooth">
                Find a Service
              </button>
              <button className="border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-smooth">
                Become a Provider
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;