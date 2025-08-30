import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import teamMember1 from "@/assets/team-member-1.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-hero mb-6">About InterviewAce</h1>
            <p className="text-subtitle max-w-2xl mx-auto">
              We're on a mission to help Indian developers succeed in global tech interviews 
              by providing AI-powered practice sessions and English fluency improvement.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-padding bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Technical interviews can be challenging, especially when English fluency becomes 
                  a barrier to showcasing your true potential. We believe every talented developer 
                  deserves the opportunity to land their dream job, regardless of language barriers.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our AI-powered platform provides realistic interview practice, instant feedback, 
                  and personalized improvement suggestions to help you build the confidence needed 
                  to excel in any technical interview.
                </p>
              </div>
              <div className="card-modern p-8">
                <h3 className="text-2xl font-semibold mb-4">Why We Built This</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Bridge the gap between technical skills and interview performance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Provide accessible, 24/7 interview practice</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Help developers improve their English communication skills</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Make interview preparation more effective and less stressful</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-subtitle max-w-2xl mx-auto">
                We're a team of experienced developers and educators passionate about helping 
                others succeed in their tech careers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-modern overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={teamMember1} 
                    alt="Rajesh Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Rajesh Kumar</h3>
                  <p className="text-primary font-medium mb-3">Founder & CEO</p>
                  <p className="text-muted-foreground text-sm">
                    Former FAANG engineer with 8+ years of experience. Passionate about 
                    helping developers break into top tech companies.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-modern overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-6xl">👩‍💻</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Priya Sharma</h3>
                  <p className="text-primary font-medium mb-3">Lead AI Engineer</p>
                  <p className="text-muted-foreground text-sm">
                    AI/ML expert specializing in natural language processing and 
                    conversational AI systems.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-modern overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                  <div className="text-6xl">👨‍💻</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Arjun Patel</h3>
                  <p className="text-primary font-medium mb-3">Head of Product</p>
                  <p className="text-muted-foreground text-sm">
                    Product strategist with experience building developer tools 
                    at scale for global markets.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We're committed to providing the highest quality interview preparation 
                  experience with cutting-edge AI technology.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
                <p className="text-muted-foreground">
                  Quality interview preparation shouldn't be a privilege. We make our 
                  platform accessible to developers from all backgrounds.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Growth</h3>
                <p className="text-muted-foreground">
                  We believe in continuous improvement and help our users track their 
                  progress every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;