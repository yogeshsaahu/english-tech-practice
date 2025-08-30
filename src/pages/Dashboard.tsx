import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Play,
  FileText,
  Award,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const recentSessions = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Technical Interview",
      company: "Google",
      score: 85,
      duration: "45 min",
      status: "completed"
    },
    {
      id: 2,
      date: "2024-01-12",
      type: "System Design",
      company: "Amazon",
      score: 78,
      duration: "60 min",
      status: "completed"
    },
    {
      id: 3,
      date: "2024-01-10",
      type: "Frontend Interview",
      company: "Meta",
      score: 92,
      duration: "40 min",
      status: "completed"
    },
    {
      id: 4,
      date: "2024-01-08",
      type: "Behavioral",
      company: "Microsoft",
      score: 80,
      duration: "30 min",
      status: "completed"
    }
  ];

  const recommendations = [
    {
      title: "Practice System Design",
      description: "Your system design scores could improve. Try more architecture questions.",
      priority: "high"
    },
    {
      title: "Improve Communication",
      description: "Work on explaining your thought process more clearly during coding.",
      priority: "medium"
    },
    {
      title: "Mock Behavioral Round",
      description: "Practice more behavioral questions to boost confidence.",
      priority: "low"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Rajesh! 👋</h1>
          <p className="text-muted-foreground">Here's your interview preparation progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                  <p className="text-3xl font-bold text-primary">84</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sessions Completed</p>
                  <p className="text-3xl font-bold">28</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-muted-foreground">4 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Practice Time</p>
                  <p className="text-3xl font-bold">18h</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <Clock className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-muted-foreground">2.5h this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <Award className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-muted-foreground">3 new badges</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Chart */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Progress Overview</span>
                <Button variant="outline" size="sm">View Details</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Technical Skills</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">English Communication</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">System Design</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Behavioral Questions</span>
                  <span className="text-sm text-muted-foreground">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <Link to="/interview">
                  <Button className="w-full bg-primary hover:bg-primary-hover">
                    Start New Interview Session
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Sessions</span>
                <Button variant="outline" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{session.type}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{session.company}</span>
                          <span>•</span>
                          <span>{session.duration}</span>
                          <span>•</span>
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={session.score >= 80 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {session.score}%
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="card-modern mt-8">
          <CardHeader>
            <CardTitle>📈 Recommendations for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{rec.title}</h3>
                    <Badge 
                      variant={
                        rec.priority === 'high' ? 'destructive' : 
                        rec.priority === 'medium' ? 'default' : 
                        'secondary'
                      }
                      className="text-xs"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{rec.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Practice
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;