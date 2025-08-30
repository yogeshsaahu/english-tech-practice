import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Send, LogOut, MessageSquare, Volume2, Clock } from "lucide-react";
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

const Interview = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(8);
  const [technicalScore] = useState(85);
  const [fluencyScore] = useState(78);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI interviewer. I'll be conducting a technical interview with you today. Let's start with a simple question: Can you tell me about yourself and your experience with software development?",
      timestamp: new Date(),
      isTyping: false
    }
  ]);

  const currentQuestionText = "Tell me about yourself and your experience with software development. Focus on your technical skills and recent projects.";

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll to bottom
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

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: currentMessage,
      timestamp: new Date(),
      isTyping: false
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage("");

    // Show typing indicator
    setTimeout(() => {
      const typingMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: "",
        timestamp: new Date(),
        isTyping: true
      };
      setMessages(prev => [...prev, typingMessage]);

      // Replace with actual response
      setTimeout(() => {
        const responses = [
          "Excellent! I can see you have solid experience. Let me ask you a technical question: How would you implement a LRU cache in your preferred programming language?",
          "That's great background. Now, let's dive deeper: Can you explain the difference between SQL and NoSQL databases? When would you choose one over the other?",
          "Interesting approach! Here's a system design question: How would you design a URL shortener like bit.ly? Walk me through your architecture.",
          "Good explanation! Let's talk about data structures: Can you implement a binary search tree and explain its time complexities?"
        ];
        
        const aiResponse: Message = {
          id: messages.length + 2,
          sender: "ai",
          text: responses[Math.min(currentQuestion - 1, responses.length - 1)],
          timestamp: new Date(),
          isTyping: false
        };
        
        setMessages(prev => prev.slice(0, -1).concat([aiResponse]));
        setCurrentQuestion(prev => Math.min(prev + 1, totalQuestions));
      }, 2000);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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

  const exitSession = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold text-primary">{formatTime(timeElapsed)}</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div className="text-lg font-medium">{currentQuestion}/{totalQuestions} Questions</div>
            </div>
          </div>
          
          <Button 
            variant="destructive" 
            size="sm"
            onClick={exitSession}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Exit Session</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto px-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex animate-fade-in ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {message.sender === 'ai' ? (
                      <div className="w-12 h-12 rounded-full bg-muted p-2 flex items-center justify-center">
                        <img 
                          src={aiAvatar} 
                          alt="AI Interviewer" 
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium text-sm">You</span>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                    message.sender === 'ai' 
                      ? 'bg-muted text-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {message.isTyping ? (
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">AI is typing...</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Sticky */}
          <div className="sticky bottom-0 bg-background border-t border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Button
                variant={isVoiceMode ? "default" : "outline"}
                size="sm"
                onClick={toggleVoiceMode}
                className="flex items-center space-x-2"
              >
                <Volume2 className="h-4 w-4" />
                <span>Voice Mode</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Text Mode</span>
              </Button>
            </div>
            
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your answer here..."
                  className="min-h-[60px] resize-none"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "outline"}
                  size="icon"
                  className="h-[60px] w-[60px]"
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="h-[60px] w-[60px]"
                  size="icon"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {isRecording && (
              <div className="flex items-center justify-center mt-3 text-sm text-primary animate-fade-in">
                <div className="w-2 h-2 bg-destructive rounded-full mr-2 animate-pulse"></div>
                Recording... Click mic to stop
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-border bg-muted/30 p-6 space-y-6">
          {/* Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Session Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Questions Completed</span>
                <span className="font-medium">{currentQuestion - 1}/{totalQuestions}</span>
              </div>
              <Progress value={(currentQuestion - 1) / totalQuestions * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Current Question */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Current Question</CardTitle>
                <Badge variant="secondary">{currentQuestion}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentQuestionText}
              </p>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Live Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Technical Score</span>
                  <span className="font-medium">{technicalScore}%</span>
                </div>
                <Progress value={technicalScore} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Fluency Score</span>
                  <span className="font-medium">{fluencyScore}%</span>
                </div>
                <Progress value={fluencyScore} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Session Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Session Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role:</span>
                <span>Full Stack Developer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Level:</span>
                <Badge variant="outline">Intermediate</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>45 min</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              Skip Question
            </Button>
            <Button variant="destructive" className="w-full" onClick={exitSession}>
              End Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;