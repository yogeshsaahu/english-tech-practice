import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  BarChart3, 
  MessageSquare, 
  Clock, 
  Users, 
  Trophy,
  Check,
  ArrowRight,
  Star,
  Quote
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Interviewer",
      description: "Practice with our advanced AI that conducts realistic technical interviews and provides instant feedback."
    },
    {
      icon: BarChart3,
      title: "Progress Dashboard",
      description: "Track your improvement over time with detailed analytics and performance insights."
    },
    {
      icon: MessageSquare,
      title: "English Feedback",
      description: "Improve your communication skills with real-time feedback on grammar, pronunciation, and clarity."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Practice anytime, anywhere. No scheduling required - start your interview session instantly."
    },
    {
      icon: Users,
      title: "Company-Specific",
      description: "Practice with questions tailored to your target companies like Google, Amazon, Microsoft, and more."
    },
    {
      icon: Trophy,
      title: "Success Tracking",
      description: "Monitor your achievements and celebrate milestones as you progress in your interview skills."
    }
  ];

  const testimonials = [
    {
      name: "Arjun Singh",
      role: "Software Engineer at Google",
      image: testimonial1,
      text: "InterviewAce helped me land my dream job at Google. The AI interviewer was incredibly realistic and the feedback was spot-on."
    },
    {
      name: "Priya Patel",
      role: "Frontend Developer at Microsoft",
      image: testimonial2,
      text: "The English communication feedback feature was a game-changer for me. I felt so much more confident during my actual interviews."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: ["3 interview sessions", "Basic feedback", "Progress tracking"],
      popular: false
    },
    {
      name: "Pro", 
      price: "$29",
      period: "/month",
      features: ["Unlimited sessions", "Advanced analytics", "Company-specific questions", "Priority support"],
      popular: true
    },
    {
      name: "Premium",
      price: "$49", 
      period: "/month",
      features: ["Everything in Pro", "1-on-1 coaching", "Resume review", "Job referrals"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-background to-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-hero mb-6">
                  Ace Your Next Tech Interview with AI
                </h1>
                <p className="text-subtitle mb-8 max-w-lg">
                  Practice real interviews, improve your English, and build confidence 
                  with our AI-powered interview preparation platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/demo">
                    <Button size="lg" className="btn-hero">
                      Try Free Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="lg" className="btn-secondary">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Start practicing instantly</span>
                  </div>
                </div>
              </div>
              
              <div className="animate-slide-up">
                <img 
                  src={heroImage} 
                  alt="AI Interview Preparation Platform" 
                  className="w-full h-auto rounded-2xl shadow-large"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Everything You Need to Succeed</h2>
              <p className="text-subtitle max-w-2xl mx-auto">
                Our comprehensive platform provides all the tools you need to excel 
                in technical interviews and land your dream job.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="card-feature">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
              <p className="text-subtitle max-w-2xl mx-auto">
                Hear from developers who've successfully landed their dream jobs 
                using InterviewAce.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-modern">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Quote className="h-8 w-8 text-primary/20 mr-4" />
                      <div className="flex text-primary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-lg text-foreground mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview Section */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
              <p className="text-subtitle max-w-2xl mx-auto">
                Choose the plan that fits your interview preparation needs. 
                Start free and upgrade as you grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`card-modern relative ${
                    plan.popular 
                      ? 'ring-2 ring-primary shadow-large scale-105' 
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-6">
                      {plan.price}
                      <span className="text-lg text-muted-foreground font-normal">
                        {plan.period}
                      </span>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={plan.name === 'Free' ? '/signup' : '/pricing'}>
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-primary hover:bg-primary-hover' 
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Detailed Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-hero text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of developers who have successfully prepared for their 
              technical interviews with InterviewAce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;