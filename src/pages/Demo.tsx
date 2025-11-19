import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Send, ArrowLeft, MessageSquare, Volume2, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aiAvatar from "@/assets/ai-avatar.png";

type MessageSender = "ai" | "user";

interface Message {
  id: number;
  sender: MessageSender;
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

const Demo = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(3); // Limited for demo
  const [technicalScore] = useState(0);
  const [fluencyScore] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Welcome to InterviewAce Demo! 🎉 I'll conduct a quick 3-question technical interview to showcase our AI interviewer. Let's start: Can you tell me about yourself and your programming experience?",
      timestamp: new Date(),
      isTyping: false
    }
  ]);

  const demoQuestions = [
    "Tell me about yourself and your programming experience.",
    "What's the difference between let, const, and var in JavaScript?",
    "How would you optimize a slow-performing web application?"
  ];

  const demoResponses = [
    "Thank you for sharing! That's great experience. Let me ask you a technical question next.",
    "Good explanation! You clearly understand JavaScript variable declarations. One more question:",
    "Excellent! You've completed the demo interview. Our full platform offers 50+ questions, detailed feedback, and progress tracking."
  ];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: currentMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");

    // Show typing indicator
    setTimeout(() => {
      const typingMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: "",
        timestamp: new Date(),
        isTyping: true
      };
      setMessages(prev => [...prev, typingMessage]);

      // AI response after typing
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => !msg.isTyping));
        
        if (currentQuestion <= demoResponses.length) {
          const aiResponse: Message = {
            id: Date.now() + 2,
            sender: "ai",
            text: demoResponses[currentQuestion - 1],
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiResponse]);
          
          if (currentQuestion < totalQuestions) {
            setCurrentQuestion(prev => prev + 1);
          }
        }
      }, 2000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  const exitDemo = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-background via-background to-primary/5">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border/50 bg-card/80 backdrop-blur-xl px-6 py-4 flex justify-between items-center shadow-soft">
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1.5 shadow-lg animate-pulse">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Demo Mode
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4 text-accent" />
              <span className="font-mono text-sm font-medium">{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={exitDemo}
            className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 animate-fade-in ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {message.sender === "ai" && (
                <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-primary/30 shadow-lg ring-2 ring-primary/10 bg-gradient-to-br from-primary/5 to-accent/5">
                  <img 
                    src={aiAvatar} 
                    alt="AI Interviewer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-3.5 transition-all duration-300 ${
                  message.sender === "ai"
                    ? "bg-gradient-to-br from-card to-muted/50 text-foreground shadow-medium border border-border/50 hover:shadow-large hover:scale-[1.02]"
                    : "bg-gradient-to-br from-primary to-primary-hover text-primary-foreground ml-auto shadow-lg hover:shadow-xl hover:scale-[1.02]"
                } ${message.isTyping ? "animate-pulse" : ""}`}
              >
                {message.isTyping ? (
                  <div className="flex space-x-1.5 py-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{message.text}</p>
                )}
              </div>
              
              {message.sender === "user" && (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-primary/20">
                  <span className="text-primary-foreground font-semibold text-sm">You</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 bg-card/80 backdrop-blur-xl p-6 shadow-large">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer..."
                className="min-h-[56px] resize-none pr-24 border-2 border-border/50 focus:border-primary rounded-xl shadow-soft bg-background/50 backdrop-blur-sm transition-all duration-300 focus:shadow-medium"
                disabled={currentQuestion > totalQuestions}
              />
              <div className="absolute right-3 top-3 flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isVoiceMode ? "default" : "ghost"}
                  onClick={toggleVoiceMode}
                  className={`h-9 w-9 p-0 rounded-lg transition-all duration-300 ${
                    isVoiceMode ? "shadow-lg scale-110" : "hover:scale-110"
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={isRecording ? "destructive" : "ghost"}
                  onClick={toggleRecording}
                  className={`h-9 w-9 p-0 rounded-lg transition-all duration-300 ${
                    isRecording ? "animate-pulse shadow-lg scale-110" : "hover:scale-110"
                  }`}
                  disabled={!isVoiceMode}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage} 
              disabled={!currentMessage.trim() || currentQuestion > totalQuestions}
              className="h-[56px] px-8 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-gradient-to-b from-card/80 to-card/50 backdrop-blur-xl border-l border-border/50 p-6 space-y-5 shadow-large overflow-y-auto">
        {/* Progress */}
        <Card className="bg-gradient-to-br from-card to-muted/30 border-border/50 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 font-poppins">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
              Demo Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-3 font-medium">
                <span className="text-muted-foreground">Questions</span>
                <span className="text-primary font-semibold">{currentQuestion}/{totalQuestions}</span>
              </div>
              <Progress 
                value={(currentQuestion / totalQuestions) * 100} 
                className="h-2.5 bg-muted/50 shadow-inner"
              />
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 font-poppins">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              Current Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed font-medium">
              {currentQuestion <= totalQuestions ? demoQuestions[currentQuestion - 1] : "Demo completed! 🎉"}
            </p>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="bg-gradient-to-br from-card to-muted/30 border-border/50 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold font-poppins">Demo Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-foreground group">
                <span className="text-accent text-lg group-hover:scale-125 transition-transform">✨</span>
                <span className="font-medium">AI-powered interviewer</span>
              </div>
              <div className="flex items-center gap-2.5 text-foreground group">
                <span className="text-accent text-lg group-hover:scale-125 transition-transform">🎯</span>
                <span className="font-medium">Real-time feedback</span>
              </div>
              <div className="flex items-center gap-2.5 text-foreground group">
                <span className="text-accent text-lg group-hover:scale-125 transition-transform">📊</span>
                <span className="font-medium">Performance tracking</span>
              </div>
              <div className="flex items-center gap-2.5 text-foreground group">
                <span className="text-accent text-lg group-hover:scale-125 transition-transform">🎤</span>
                <span className="font-medium">Voice & text input</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-primary/30 shadow-large hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse" />
          <CardContent className="pt-6 relative z-10">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg mb-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-primary text-lg font-poppins">Liked the demo?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get access to 50+ questions, detailed feedback, and progress tracking.
              </p>
              <div className="space-y-2.5 pt-2">
                <Button 
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  className="w-full border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Preview Dashboard
                </Button>
                <Button 
                  onClick={() => navigate("/signup")}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Demo;