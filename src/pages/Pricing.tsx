import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "3 interview sessions per month",
        "Basic progress tracking",
        "English feedback",
        "Community support",
        "Access to basic question bank"
      ],
      limitations: [
        "Limited session history",
        "No company-specific questions"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      description: "For serious interview preparation",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Unlimited interview sessions",
        "Advanced progress analytics",
        "Company-specific questions",
        "Detailed performance reports",
        "Priority email support",
        "Mock interview recordings",
        "Custom study plans"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Premium",
      description: "For teams and career coaching",
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        "Everything in Pro",
        "1-on-1 career coaching sessions",
        "Resume review and optimization",
        "Salary negotiation guidance",
        "LinkedIn profile optimization",
        "Job referral network access",
        "24/7 priority support"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return "Free";
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const period = isYearly ? "/year" : "/month";
    return `$${price}${period}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return null;
    const yearlySavings = (plan.monthlyPrice * 12) - plan.yearlyPrice;
    return Math.round((yearlySavings / (plan.monthlyPrice * 12)) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-hero mb-6">Simple, Transparent Pricing</h1>
            <p className="text-subtitle max-w-2xl mx-auto mb-8">
              Choose the plan that works best for your interview preparation needs. 
              All plans include access to our AI interviewer and progress tracking.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-medium ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge variant="secondary" className="ml-2">Save 17%</Badge>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section-padding bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={plan.name} 
                  className={`card-modern relative ${
                    plan.popular 
                      ? 'ring-2 ring-primary shadow-large scale-105' 
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <div className="text-4xl font-bold">
                      {getPrice(plan)}
                      {plan.monthlyPrice > 0 && isYearly && getSavings(plan) && (
                        <div className="text-sm font-normal text-green-600 mt-1">
                          Save {getSavings(plan)}%
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="text-xs text-muted-foreground">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary-hover' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Pricing FAQ</h2>
            </div>

            <div className="space-y-6">
              <Card className="card-modern">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Can I change my plan anytime?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be 
                    reflected in your next billing cycle, and we'll prorate any differences.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Is there a money-back guarantee?</h3>
                  <p className="text-muted-foreground">
                    We offer a 14-day money-back guarantee for all paid plans. If you're not 
                    satisfied with InterviewAce, we'll refund your payment in full.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Do you offer student discounts?</h3>
                  <p className="text-muted-foreground">
                    Yes! Students with a valid .edu email address can get 50% off any paid plan. 
                    Contact our support team to apply for student pricing.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards, PayPal, and UPI payments for Indian customers. 
                    All payments are processed securely through Stripe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Interviews?</h2>
            <p className="text-subtitle mb-8">
              Join thousands of developers who have successfully landed their dream jobs 
              with InterviewAce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary-hover">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;