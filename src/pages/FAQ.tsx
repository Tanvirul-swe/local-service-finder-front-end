import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  Shield, 
  Settings,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "booking", name: "Booking & Scheduling", icon: Users },
    { id: "payment", name: "Payment & Pricing", icon: CreditCard },
    { id: "providers", name: "Service Providers", icon: ShoppingBag },
    { id: "safety", name: "Safety & Security", icon: Shield },
    { id: "account", name: "Account & Settings", icon: Settings }
  ];

  const faqs = [
    {
      id: 1,
      category: "booking",
      question: "How do I book a service?",
      answer: "Booking a service is simple! Search for the service you need, browse through available providers in your area, compare their ratings and prices, then click 'Book Now' on your preferred provider. You'll be guided through selecting a date/time and completing your booking."
    },
    {
      id: 2,
      category: "booking", 
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled service time without any penalty. For cancellations within 24 hours, a small fee may apply depending on the service provider's policy."
    },
    {
      id: 3,
      category: "booking",
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 24-48 hours in advance for the best availability. However, many providers offer same-day or next-day services depending on their schedule and the type of service requested."
    },
    {
      id: 4,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      id: 5,
      category: "payment",
      question: "When am I charged for a service?",
      answer: "Payment is typically processed after the service is completed and you've confirmed satisfaction. For some services, a small deposit may be required at the time of booking, with the remaining balance charged upon completion."
    },
    {
      id: 6,
      category: "payment",
      question: "Are there any hidden fees?",
      answer: "No, we believe in transparent pricing. All fees, including our service fee and any applicable taxes, are clearly displayed before you confirm your booking. The price you see is the price you pay."
    },
    {
      id: 7,
      category: "providers",
      question: "How do you verify service providers?",
      answer: "All service providers undergo a comprehensive verification process including background checks, identity verification, insurance verification, and skills assessment. We also continuously monitor reviews and ratings to ensure quality standards."
    },
    {
      id: 8,
      category: "providers",
      question: "Can I choose a specific provider?",
      answer: "Absolutely! You can browse all available providers, view their profiles, ratings, and reviews, then book directly with your preferred provider. You can also save favorite providers for future bookings."
    },
    {
      id: 9,
      category: "providers",
      question: "What if I'm not satisfied with the service?",
      answer: "Your satisfaction is our priority. If you're not happy with a service, contact our support team within 24 hours. We'll work with you and the provider to resolve the issue, which may include a partial refund, re-service, or full refund depending on the situation."
    },
    {
      id: 10,
      category: "safety",
      question: "Are service providers insured?",
      answer: "Yes, all service providers are required to have valid insurance coverage. Additionally, ServiceHub provides additional coverage for all bookings made through our platform for your peace of mind."
    },
    {
      id: 11,
      category: "safety",
      question: "How do you ensure my safety and security?",
      answer: "We take safety seriously. All providers are background-checked, we verify their insurance and licenses, provide secure messaging through our platform, and offer 24/7 customer support. Never share personal information outside our platform."
    },
    {
      id: 12,
      category: "safety",
      question: "What safety measures are in place during COVID-19?",
      answer: "We follow all local health guidelines. Providers are required to wear masks when requested, maintain social distancing, use sanitizer, and follow enhanced cleaning protocols. You can specify COVID-19 preferences when booking."
    },
    {
      id: 13,
      category: "account",
      question: "How do I create an account?",
      answer: "Click 'Sign Up' at the top of the page, enter your details, and verify your email address. You can also sign up using your Google or Facebook account for faster registration."
    },
    {
      id: 14,
      category: "account",
      question: "Can I update my profile information?",
      answer: "Yes, you can update your profile information anytime by going to Account Settings. You can change your contact information, address, payment methods, and notification preferences."
    },
    {
      id: 15,
      category: "account",
      question: "How do I delete my account?",
      answer: "You can delete your account in Account Settings under Privacy. Please note that deleting your account will remove all your booking history and saved preferences. This action cannot be undone."
    },
    {
      id: 16,
      category: "booking",
      question: "Do you offer emergency services?",
      answer: "Yes, we have providers who offer emergency services for urgent situations like plumbing emergencies, lockouts, and urgent cleaning needs. Look for the 'Emergency Service' badge when browsing providers."
    },
    {
      id: 17,
      category: "payment",
      question: "Can I get a receipt for my service?",
      answer: "Yes, receipts are automatically sent to your registered email address after payment is processed. You can also download receipts from your account dashboard at any time."
    },
    {
      id: 18,
      category: "providers",
      question: "How do I become a service provider?",
      answer: "Click 'Become a Provider' on our homepage to start the application process. You'll need to provide documentation of your skills, insurance, and undergo our verification process. Once approved, you can start accepting bookings."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Find answers to common questions about ServiceHub. Can't find what you're looking for? 
              Contact our support team.
            </p>
            
            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = selectedCategory === category.id;
                    return (
                      <Button
                        key={category.id}
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {category.name}
                      </Button>
                    );
                  })}
                </div>

                {/* Quick Contact */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-medium text-foreground mb-3">Still need help?</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Support
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  {categories.find(c => c.id === selectedCategory)?.name || "All Questions"}
                </h2>
                <Badge variant="secondary">
                  {filteredFAQs.length} questions
                </Badge>
              </div>
            </div>

            {filteredFAQs.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or browse different categories.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq) => (
                      <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                        <AccordionTrigger className="px-6 py-4 text-left">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {/* Contact Support CTA */}
            <Card className="mt-12 bg-gradient-card">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Didn't find what you were looking for?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you with any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Live Chat
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;