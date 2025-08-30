import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Send, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import aiAvatar from "@/assets/ai-avatar.png";

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI interviewer. I'll be conducting a technical interview with you today. Let's start with a simple question: Can you tell me about yourself and your experience with software development?",
      timestamp: new Date()
    }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(8);
  const [timeElapsed, setTimeElapsed] = useState(5); // minutes

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user" as const,
      text: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "ai" as const,
        text: "Great! I can see you have solid experience. Let me ask you a technical question: How would you implement a LRU cache in your preferred programming language?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setCurrentQuestion(prev => prev + 1);
    }, 1500);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{timeElapsed}:23</div>
              <div className="text-sm text-muted-foreground">Time Elapsed</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{currentQuestion}/{totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart
            </Button>
          </div>
        </div>
      </header>

      {/* Main Interview Area */}
      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Progress Bar */}
          <div className="p-4 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Interview Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((currentQuestion / totalQuestions) * 100)}% Complete
                </span>
              </div>
              <Progress value={(currentQuestion / totalQuestions) * 100} className="h-2" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {message.sender === 'ai' ? (
                        <img 
                          src={aiAvatar} 
                          alt="AI Interviewer" 
                          className="w-10 h-10 rounded-full bg-primary/10 p-1"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">You</span>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'ai' 
                        ? 'bg-muted text-foreground' 
                        : 'bg-primary text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <Input
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
                    className="h-[60px] w-[60px] bg-primary hover:bg-primary-hover"
                    size="icon"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {isRecording && (
                <div className="flex items-center justify-center mt-3 text-sm text-primary">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  Recording... Click mic to stop
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-border bg-muted/30 p-6">
          <div className="space-y-6">
            {/* Current Question */}
            <Card className="card-modern">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Current Question</h3>
                  <Badge variant="secondary">{currentQuestion} of {totalQuestions}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  We're focusing on technical problem-solving and system design concepts.
                </p>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card className="card-modern">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Session Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interview Type:</span>
                    <span>Full Stack Developer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <Badge variant="outline">Intermediate</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company:</span>
                    <span>Tech Startup</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="card-modern">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">💡 Quick Tips</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Take your time to think before answering</li>
                  <li>• Ask clarifying questions when needed</li>
                  <li>• Explain your thought process clearly</li>
                  <li>• Use specific examples from your experience</li>
                </ul>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Skip Question
              </Button>
              <Button variant="destructive" className="w-full">
                End Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;