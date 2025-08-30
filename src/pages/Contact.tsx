import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-hero mb-6">Get in Touch</h1>
            <p className="text-subtitle max-w-2xl mx-auto">
              Have questions about InterviewAce? We're here to help you succeed 
              in your interview preparation journey.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us how we can help you..."
                        rows={6}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="card-modern">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                        <p className="text-muted-foreground mb-1">hello@interviewace.com</p>
                        <p className="text-muted-foreground mb-1">support@interviewace.com</p>
                        <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-modern">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                        <p className="text-muted-foreground mb-1">+91 98765 43210</p>
                        <p className="text-sm text-muted-foreground">Mon - Fri, 9:00 AM - 6:00 PM IST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-modern">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                        <p className="text-muted-foreground mb-1">Koramangala</p>
                        <p className="text-muted-foreground mb-1">Bangalore, Karnataka 560034</p>
                        <p className="text-muted-foreground">India</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-modern">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                        <p className="text-muted-foreground mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-subtitle">
                Quick answers to common questions about InterviewAce.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="card-modern">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">How does the AI interviewer work?</h3>
                  <p className="text-muted-foreground">
                    Our AI interviewer uses advanced natural language processing to conduct realistic 
                    technical interviews. It asks relevant questions, provides feedback on your answers, 
                    and helps improve both your technical responses and English communication skills.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Can I practice for specific companies?</h3>
                  <p className="text-muted-foreground">
                    Yes! Our platform includes interview questions and formats tailored to specific 
                    companies like Google, Amazon, Microsoft, and many others. You can practice 
                    company-specific interview styles and question types.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Is there a free trial available?</h3>
                  <p className="text-muted-foreground">
                    Yes, we offer a free plan that includes 3 interview sessions per month and basic 
                    progress tracking. You can upgrade to our Pro or Premium plans for unlimited 
                    sessions and advanced features.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;