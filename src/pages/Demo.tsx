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
    <div className="h-screen flex bg-background">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              Demo Mode
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={exitDemo}
            className="flex items-center gap-2"
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
              className={`flex gap-4 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {message.sender === "ai" && (
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                  <img 
                    src={aiAvatar} 
                    alt="AI Interviewer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.sender === "ai"
                    ? "bg-muted/50 text-foreground"
                    : "bg-primary text-primary-foreground ml-auto"
                } ${message.isTyping ? "animate-pulse" : ""}`}
              >
                {message.isTyping ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{message.text}</p>
                )}
              </div>
              
              {message.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-medium text-sm">You</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer..."
                className="min-h-[50px] resize-none pr-20 border-border focus:border-primary"
                disabled={currentQuestion > totalQuestions}
              />
              <div className="absolute right-3 top-3 flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isVoiceMode ? "default" : "ghost"}
                  onClick={toggleVoiceMode}
                  className="h-8 w-8 p-0"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={isRecording ? "destructive" : "ghost"}
                  onClick={toggleRecording}
                  className="h-8 w-8 p-0"
                  disabled={!isVoiceMode}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage} 
              disabled={!currentMessage.trim() || currentQuestion > totalQuestions}
              className="h-[50px] px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-card border-l border-border p-6 space-y-6">
        {/* Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Demo Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Questions</span>
                <span>{currentQuestion}/{totalQuestions}</span>
              </div>
              <Progress value={(currentQuestion / totalQuestions) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Current Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentQuestion <= totalQuestions ? demoQuestions[currentQuestion - 1] : "Demo completed!"}
            </p>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Demo Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>✨ AI-powered interviewer</p>
              <p>🎯 Real-time feedback</p>
              <p>📊 Performance tracking</p>
              <p>🎤 Voice & text input</p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-primary">Liked the demo?</h3>
              <p className="text-sm text-muted-foreground">
                Get access to 50+ questions, detailed feedback, and progress tracking.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  className="w-full"
                >
                  Preview Dashboard
                </Button>
                <Button 
                  onClick={() => navigate("/signup")}
                  className="w-full"
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